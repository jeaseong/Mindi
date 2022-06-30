import re
import torch
from torch.utils.data import DataLoader, Dataset
from transformers import ElectraTokenizer, ElectraForSequenceClassification

device = torch.device('cpu')
model = ElectraForSequenceClassification.from_pretrained('./model/model_final.pt').to(device)
tokenizer = ElectraTokenizer.from_pretrained('monologg/koelectra-base-v3-discriminator')
model.eval()

class LoadDataset(Dataset):
  
  def __init__(self, sent_list):
    self.dataset = sent_list
  
  def __len__(self):
    return len(self.dataset)
  
  def __getitem__(self, idx):
    sent = self.dataset[idx]

    inputs = tokenizer(
        sent, 
        return_tensors='pt',
        truncation=True,
        max_length=300,
        padding='max_length',
        add_special_tokens=True
        )
    
    input_ids = inputs['input_ids'][0]
    attention_mask = inputs['attention_mask'][0]

    return input_ids, attention_mask

def split_feeling(feeling):
    feeling = re.sub(r'\n', ' ', feeling)
    feeling = re.sub('[a-zA-z]','', feeling)
    sent_list = [sent.strip() for sent in feeling.split('.') if sent]
    return sent_list

def predict_sentiment(feeling):
    # label_dict = {0: 'fear', 1: 'surprised', 2: 'anger', 3: 'sadness', 4: 'neutrality', 5: 'happiness', 6: 'aversion'}

    sent_list = split_feeling(feeling)
    if len(sent_list) == 0:
        return {'fear': 0, 'surprised': 0, 'anger': 0, 'sadness': 0, 'happiness': 0, 'aversion': 0}
    dataset = LoadDataset(sent_list)
    data_loader = DataLoader(dataset, batch_size = len(dataset))    
    
    with torch.no_grad():
        for input_ids_batch, attention_masks_batch in data_loader:
            y_pred = model(input_ids_batch.to(device), attention_mask=attention_masks_batch.to(device))[0]
            _, predicted = torch.max(y_pred, 1)
    
    sentiment_dict = {
        'fear': (predicted==0).sum().item(), 
        'surprised': (predicted==1).sum().item(), 
        'anger': (predicted==2).sum().item(), 
        'sadness': (predicted==3).sum().item(), 
        'happiness': (predicted==5).sum().item(), 
        'aversion': (predicted==6).sum().item()
    }
    return sentiment_dict

if __name__ == '__main__':
    result = predict_sentiment('정해진 시간을 지키지 못해서 속상했다.\n나는 왜 이럴까 매번.\n\n 정신을 차리자 제발. 영화는 재밌었다.')
    print(result)
