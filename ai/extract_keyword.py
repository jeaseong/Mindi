# -*- coding: utf-8 -*-
import numpy as np
import re
from collections import Counter, defaultdict
from scipy.sparse import csr_matrix
from sklearn.preprocessing import normalize
from konlpy.tag import Komoran

def remove_emoji(sent):
    emoji_pattern = re.compile("["
            u"\U00010000-\U0010FFFF" 
                               "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', sent) 

def split_diary(diary):
    sent_list = []
    for sents in diary:
        sents = re.sub(r'\n', ' ', sents)
        sents = re.sub(r'\r', ' ', sents)
        sents = remove_emoji(sents)
        sent_list += [sent.strip() for sent in sents.split('.') if sent]
    return sent_list

def scan_vocabulary(sent_list, tokenize, min_count):
    counter = Counter(w for sent in sent_list for w in tokenize(sent))
    counter = {w:c for w,c in counter.items() if c >= min_count}
    idx_to_vocab = [w for w, _ in sorted(counter.items(), key=lambda x:-x[1])]
    vocab_to_idx = {vocab:idx for idx, vocab in enumerate(idx_to_vocab)}
    return idx_to_vocab, vocab_to_idx

def dict_to_mat(d, n_rows, n_cols):
    rows, cols, data = [], [], []
    for (i, j), v in d.items():
        rows.append(i)
        cols.append(j)
        data.append(v)
    return csr_matrix((data, (rows, cols)), shape=(n_rows, n_cols))

def cooccurrence(tokens, vocab_to_idx, window, min_cooccurrence):
    counter = defaultdict(int)
    for s, tokens_i in enumerate(tokens):
        vocabs = [vocab_to_idx[w] for w in tokens_i if w in vocab_to_idx]
        n = len(vocabs)
        for i, v in enumerate(vocabs):
            if window <= 0:
                b, e = 0, n
            else:
                b = max(0, i - window)
                e = min(i + window, n)
            for j in range(b, e):
                if i == j:
                    continue
                counter[(v, vocabs[j])] += 1
                counter[(vocabs[j], v)] += 1
    counter = {k:v for k,v in counter.items() if v >= min_cooccurrence}
    n_vocabs = len(vocab_to_idx)
    return dict_to_mat(counter, n_vocabs, n_vocabs)

def word_graph(sent_list, tokenize, min_count, window, min_cooccurrence):
    idx_to_vocab, vocab_to_idx = scan_vocabulary(sent_list, tokenize, min_count)
    tokens = [tokenize(sent) for sent in sent_list]
    g = cooccurrence(tokens, vocab_to_idx, window, min_cooccurrence)
    return g, idx_to_vocab

def pagerank(x, df=0.85, max_iter=30):
    assert 0 < df < 1

    # initialize
    A = normalize(x, axis=0, norm='l1')
    R = np.ones(A.shape[0]).reshape(-1,1)
    bias = (1 - df) * np.ones(A.shape[0]).reshape(-1,1)

    # iteration
    for _ in range(max_iter):
        R = df * (A * R) + bias

    return R

komoran = Komoran()
def komoran_tokenize(sent):
    words = komoran.pos(sent, join=False)
    words = [w for w, p in words if (p == 'NNG' or p == 'NNP' or p == 'XR' or p == 'VA')]
    # NNG = 일반명사, #NNP = 고유명사, XR = 어근, VV = 동사, VA = 형용사
    return words

def textrank_keyword(diary, min_count = 2, window = -1, min_cooccurrence = 2, tokenize=komoran_tokenize, df=0.85, max_iter=30, topk=5):
    sent_list = split_diary(diary)
    g, idx_to_vocab = word_graph(sent_list, tokenize, min_count, window, min_cooccurrence)
    R = pagerank(g, df, max_iter).reshape(-1)
    idxs = R.argsort()[-topk:]
    keywords = [(idx_to_vocab[idx], R[idx]) for idx in reversed(idxs)]
    return keywords

if __name__ == "__main__":
    diary = [
    "아니 이거 줄 간격은 어떻게 되는지 알아봐야겠어\r\n\r\n그래서 이렇게 써도 디비에 저장이 되어야 하는데 그렇게 될까??\r\n\r\n그렇게 됐으면 좋겠다.", 
    "이렇게 하는 것이 맞는 것인",
    "좋은기회를 얻어 감사하게도 GV시사로 미리보게 되었습니다..! 다시 한번 감사드립니다 🙇\u200d♂️  일단 영화의 소감은 박찬욱 감독님의 영화같으면서도 아닌거같은 그 사이에서 나오는 미묘함이 주는 짜릿함이 인상깊은작품이었습니다! \r\n\r\n 영화에서 그려지는 주도권을 확실하게 뺏긴거같은 남자와 확실하게 잡은거같은 여자의 관계를 평소 영화들처럼 노골적으로 그리지않고 미묘한 선을 그리며 진행되는데 매혹적인 두 배우님이 이끄는 그 미묘한 텐션이 참 좋았습니다.(우리 감독님 역시 배우신 변태구나 싶었네요 ㅎㅎ)\r\n\r\n박해일, 탕웨이 배우님이 뿜어내는 골져스한 아우라가 이 영화를 더 고급지게 만들어주고 그런 박해일, 탕웨이 두 배우님이 이끄는 서사에 분위기를 띄어주는 빛나는 조연배우님 연기도 일품이였습니다!원래 박감독님 작품들의 대사들을 좋아하는데 요번 영화는 유독 이상하게 끌리네요.\r\n\r\n 단어 조합들이 참 재밌었어요. (말도안되게 웃긴 대사들도 있었고요) 😂미장센 그냥 뭐 말이 필요한가요.. 아 그냥 박찬욱 감독님 영화네 바로 나옵니다. 의상 소품 배경 하나하나 진짜 경악스러울정도로 완벽에 가까웠습니다..그리고 애플워치나 전자기기를 사용하는 시퀀스들이 많은데 부조화속 조화라 해야할까요? 안어울리면서 어울리는 신기함을 많이 받았습니다",
    "좋은기회를 얻어 감사하게도 GV시사로 미리보게 되었습니다..! 다시 한번 감사드립니다 🙇\u200d♂️  일단 영화의 소감은 박찬욱 감독님의 영화같으면서도 아닌거같은 그 사이에서 나오는 미묘함이 주는 짜릿함이 인상깊은작품이었습니다! \r\n\r\n 영화에서 그려지는 주도권을 확실하게 뺏긴거같은 남자와 확실하게 잡은거같은 여자의 관계를 평소 영화들처럼 노골적으로 그리지않고 미묘한 선을 그리며 진행되는데 매혹적인 두 배우님이 이끄는 그 미묘한 텐션이 참 좋았습니다.(우리 감독님 역시 배우신 변태구나 싶었네요 ㅎㅎ)\r\n\r\n박해일, 탕웨이 배우님이 뿜어내는 골져스한 아우라가 이 영화를 더 고급지게 만들어주고 그런 박해일, 탕웨이 두 배우님이 이끄는 서사에 분위기를 띄어주는 빛나는 조연배우님 연기도 일품이였습니다!원래 박감독님 작품들의 대사들을 좋아하는데 요번 영화는 유독 이상하게 끌리네요.\r\n\r\n 단어 조합들이 참 재밌었어요. (말도안되게 웃긴 대사들도 있었고요) 😂미장센 그냥 뭐 말이 필요한가요.. 아 그냥 박찬욱 감독님 영화네 바로 나옵니다. 의상 소품 배경 하나하나 진짜 경악스러울정도로 완벽에 가까웠습니다..그리고 애플워치나 전자기기를 사용하는 시퀀스들이 많은데 부조화속 조화라 해야할까요? 안어울리면서 어울리는 신기함을 많이 받았습니다", 
    "마침내... 올해 가장 기대하던 영화 헤어질 결심을 보았는데요감독님이 함께하시는 GV에 참석할 수 있어서 영광이었습니다! 이런 기회를 주신 익스트림 무비에 정말 감사드려요 :)사실 거장이신 건 익히 알고 있지만 이전에 박찬욱 감독님의 영화를 한 편도 보지 않았었어요 아무래도 잔혹성이나 선정성 등의 문제로 도전을 하지 못했었는데 이번엔 조금 순한 맛(?)이라고 해서 편한 마음으로 보러 갈 수 있었습니다 ㅎㅎ영화가 끝나고서도 말러의 교향곡 5번이 여운으로 계속 남았는데요 영화 전체를 관통하는 주제 음악이라고 생각됩니다GV에서 감독님께서 워낙 유명한 노래라 넣느냐 마느냐로 고민이 많았지만 결국 적합한 음악이라서 넣으셨다고 하셨는데 탁월한 선택이셨어요 아름답지만 어딘가 고독하고 우울한 정서가 잘 느껴졌어요", 
    "마침내... 올해 가장 기대하던 영화 헤어질 결심을 보았는데요감독님이 함께하시는 GV에 참석할 수 있어서 영광이었습니다! 이런 기회를 주신 익스트림 무비에 정말 감사드려요 :)사실 거장이신 건 익히 알고 있지만 이전에 박찬욱 감독님의 영화를 한 편도 보지 않았었어요 아무래도 잔혹성이나 선정성 등의 문제로 도전을 하지 못했었는데 이번엔 조금 순한 맛(?)이라고 해서 편한 마음으로 보러 갈 수 있었습니다 ㅎㅎ영화가 끝나고서도 말러의 교향곡 5번이 여운으로 계속 남았는데요 영화 전체를 관통하는 주제 음악이라고 생각됩니다GV에서 감독님께서 워낙 유명한 노래라 넣느냐 마느냐로 고민이 많았지만 결국 적합한 음악이라서 넣으셨다고 하셨는데 탁월한 선택이셨어요 아름답지만 어딘가 고독하고 우울한 정서가 잘 느껴졌어요", 
    "마침내... 올해 가장 기대하던 영화 헤어질 결심을 보았는데요감독님이 함께하시는 GV에 참석할 수 있어서 영광이었습니다! 이런 기회를 주신 익스트림 무비에 정말 감사드려요 :)사실 거장이신 건 익히 알고 있지만 이전에 박찬욱 감독님의 영화를 한 편도 보지 않았었어요 아무래도 잔혹성이나 선정성 등의 문제로 도전을 하지 못했었는데 이번엔 조금 순한 맛(?)이라고 해서 편한 마음으로 보러 갈 수 있었습니다 ㅎㅎ영화가 끝나고서도 말러의 교향곡 5번이 여운으로 계속 남았는데요 영화 전체를 관통하는 주제 음악이라고 생각됩니다GV에서 감독님께서 워낙 유명한 노래라 넣느냐 마느냐로 고민이 많았지만 결국 적합한 음악이라서 넣으셨다고 하셨는데 탁월한 선택이셨어요 아름답지만 어딘가 고독하고 우울한 정서가 잘 느껴졌어요", 
    "마침내... 올해 가장 기대하던 영화 헤어질 결심을 보았는데요감독님이 함께하시는 GV에 참석할 수 있어서 영광이었습니다! \r\n이런 기회를 주신 익스트림 무비에 정말 감사드려요 :)사실 거장이신 건 익히 알고 있지만 이전에 박찬욱 감독님의 영화를 한 편도 보지 않았었어요 \r\n아무래도 잔혹성이나 선정성 등의 문제로 도전을 하지 못했었는데 이번엔 조금 순한 맛(?)이라고 해서 편한 마음으로 보러 갈 수 있었습니다 ㅎㅎ\r\n영화가 끝나고서도 말러의 교향곡 5번이 여운으로 계속 남았는데요 영화 전체를 관통하는 주제 음악이라고 생각됩니다GV에서 감독님께서 워낙 유명한\r\n 노래라 넣느냐 마느냐로 고민이 많았지만 결국 적합한 음악이라서 넣으셨다고 하셨는데 탁월한 선택이셨어요 아름답지만 어딘가 고독하고 우울한 정서가 잘 느껴졌어요", 
    "아 이거 정말 힘들다아 이거 정말 힘들다아 이거 정말 힘들다아 이거 정말 힘들다", 
    "과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지\n\n과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지\n\n과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지\n\n과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지\n\n", 
    "과연 나는 date 미로에서 벗어날 수 있는 것인가. 이번에 성공하면 그대로 다른거 해야지"
    ]
    keywords = textrank_keyword(diary)
    keyword_list = [i for i, _ in keywords]
    print(keyword_list)