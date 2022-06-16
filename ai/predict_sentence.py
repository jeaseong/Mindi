import sys
import torch
from transformers import ElectraTokenizer, ElectraForSequenceClassification

device = torch.device('cuda')
model = ElectraForSequenceClassification.from_pretrained('./model/model_2022-06-14_acc0.67.pt').to(device)

def split_diary(diary):
    diary.replace("\n", "")
    sent_list = [sent.strip() for sent in diary.split(".") if sent]
    return sent_list

def convert_input_data(sent):
    tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")

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
    label_dict = {0: '공포', 1: '놀람', 2: '분노', 3: '슬픔', 4: '중립', 5: '행복', 6: '혐오'}
    model.eval()

    input_ids, attention_mask = convert_input_data(sent)
    y_pred = model(input_ids.unsqueeze(0).to(device), attention_mask=attention_mask.unsqueeze(0).to(device))[0]
    _, predicted = torch.max(y_pred, 1)
    sentiment = label_dict[predicted.item()]
    return sentiment

def predict_sentiment_list(diary):
    sent_list = split_diary(diary)
    for sent in sent_list:
        sentiment = predict_sentiment(sent)
        print(sentiment)

if __name__ == '__main__':
    predict_sentiment_list(sys.argv[1])