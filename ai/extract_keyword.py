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
        sents.replace('\n', '')
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
    '오패산터널 총격전 용의자 검거 서울 연합뉴스 경찰 관계자들이 19일 오후 서울 강북구 오패산 터널 인근에서 사제 총기를 발사해 경찰을 살해한 용의자 성모씨를 검거하고 있다. 성씨는 검거 당시 서바이벌 게임에서 쓰는 방탄조끼에 헬멧까지 착용한 상태였다. 서울 연합뉴스 김은경 기자. 사제 총기로 경찰을 살해한 범인 성모 46 씨는 주도면밀했다',
    '경찰에 따르면 성씨는 19일 오후 강북경찰서 인근 부동산 업소 밖에서 부동산업자 이모 67 씨가 나오기를 기다렸다 이씨와는 평소에도 말다툼을 자주 한 것으로 알려졌다. 이씨가 나와 걷기 시작하자 성씨는 따라가면서 미리 준비해온 사제 총기를 이씨에게 발사했다. 총알이 빗나가면서 이씨는 도망갔다. 그 빗나간 총알은 지나가던 행인 71 씨의 배를 스쳤다',
    '성씨는 강북서 인근 치킨집까지 이씨 뒤를 쫓으며 실랑이하다 쓰러뜨린 후 총기와 함께 가져온 망치로 이씨 머리를 때렸다. 이 과정에서 오후 6시 20분께 강북구 번동 길 위에서 사람들이 싸우고 있다 총소리가 났다는 등의 신고가 여러건 들어왔다'
    ]
    keywords = textrank_keyword(diary)
    keyword_list = [i for i, _ in keywords]
    print(keyword_list)