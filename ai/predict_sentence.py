import sys
import torch
from transformers import ElectraTokenizer, ElectraForSequenceClassification

device = torch.device('cuda')
model = ElectraForSequenceClassification.from_pretrained('./model/model_2022-06-14_acc0.67.pt').to(device)
tokenizer = ElectraTokenizer.from_pretrained('monologg/koelectra-base-v3-discriminator')
model.eval()

def split_diary(diary):
    diary.replace('\n', '')
    sent_list = [sent.strip() for sent in diary.split('.') if sent]
    return sent_list

def convert_input_data(sent):    

    inputs = tokenizer(
        sent, 
        return_tensors='pt',
        truncation=True,
        max_length=128,
        padding='max_length',
        add_special_tokens=True
        )

    input_ids = inputs['input_ids'][0]
    attention_mask = inputs['attention_mask'][0]

    return input_ids, attention_mask

def predict_sentiment(sent):
    label_dict = {0: 'fear', 1: 'surprised', 2: 'anger', 3: 'sadness', 4: 'neutrality', 5: 'happiness', 6: 'aversion'}

    # batch로 묶어서 한번에 하듯이 sent_list 한번에 나오도록 변경해보기
    input_ids, attention_mask = convert_input_data(sent) 
    y_pred = model(input_ids.unsqueeze(0).to(device), attention_mask=attention_mask.unsqueeze(0).to(device))[0]
    _, predicted = torch.max(y_pred, 1)
    sentiment = label_dict[predicted.item()]
    return sentiment

def predict_sentiment_list(diary):
    sent_list = split_diary(diary)
    sentiment_dict = {'fear': 0, 'surprised': 0, 'anger': 0, 'sadness': 0, 'happiness': 0, 'aversion': 0}
    for sent in sent_list:
        sentiment = predict_sentiment(sent)
        if sentiment != 'neutrality':
            sentiment_dict[sentiment] += 1
    return sentiment_dict

if __name__ == '__main__':
    result = predict_sentiment_list('정해진 시간을 지키지 못해서 속상했다.\n나는 왜 이럴까 매번.\n\n 정신을 차리자 제발. 영화는 재밌었다.')
    print(result)