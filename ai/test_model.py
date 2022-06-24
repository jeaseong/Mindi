import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sn
import datetime
import torch
from torch import nn
from torch.nn import functional as F
from torch.optim import AdamW
from torch.utils.data import DataLoader, Dataset, random_split
from transformers import ElectraTokenizer, ElectraForSequenceClassification
from tqdm.notebook import tqdm
from sklearn.metrics import confusion_matrix

# 1. load model
device = torch.device('cuda')
model = ElectraForSequenceClassification.from_pretrained('./model/model_2022-06-17_epoch0_train0.5677_valid0.6189.pt').to(device)

# 2. Load Dataset
class LoadDataset(Dataset):
  
  def __init__(self, csv_file):
    # csv_file 읽어오기
    self.dataset = pd.read_csv(csv_file, encoding='cp949') 
    
    # 중복제거
    self.dataset.drop_duplicates(subset=['Sentence'], inplace=True, ignore_index = True)
    
    # Sentence 전처리
    # 여러가지 키보드상 특수문자 제거
    self.dataset['Sentence'] = self.dataset['Sentence'].str.replace('[\{\}\[\]\/?.,;:|\)*~`·!^\-_+<>@\#$%&\\\=\(\'\"]', ' ', regex = True)
    # 공백 제거
    self.dataset['Sentence'] = self.dataset['Sentence'].str.strip()

    # label 정수로 변경
    label_dict = {'공포': 0, '놀람':1, '분노':2, '슬픔':3, '중립':4, '행복':5, '혐오':6}
    self.dataset['Label'] = self.dataset['Emotion'].map(label_dict)

    # tokenizer 설정
    self.tokenizer = ElectraTokenizer.from_pretrained('monologg/koelectra-base-v3-discriminator')

    print(self.dataset.describe())
  
  def __len__(self):
    return len(self.dataset)
  
  def __getitem__(self, idx):
    row = self.dataset.iloc[idx]
    sent = row['Sentence']
    label = row['Label']

    inputs = self.tokenizer(
        sent, 
        return_tensors='pt',
        truncation=True,
        max_length=300,
        padding='max_length',
        add_special_tokens=True
        )
    
    input_ids = inputs['input_ids'][0]
    attention_mask = inputs['attention_mask'][0]

    return input_ids, attention_mask, label

# 3. split dataset into train, validation, test
dataset = LoadDataset('./dataset/conversation_all.csv')
dataset_size = len(dataset)
train_size = int(dataset_size * 0.8)
validation_size = int(dataset_size * 0.1)
test_size = dataset_size - train_size - validation_size

train_dataset, validation_dataset, test_dataset = random_split(dataset, [train_size, validation_size, test_size])

# hyperparameter
batch_size = 32

# dataloader
test_loader = DataLoader(test_dataset, batch_size=batch_size , shuffle=True, drop_last=True)

model.eval()

test_correct = 0
test_total = 0

y_predicted = []
y_true = []

for input_ids_batch, attention_masks_batch, y_batch in tqdm(test_loader):
    y_batch = y_batch.to(device)
    y_pred = model(input_ids_batch.to(device), attention_mask=attention_masks_batch.to(device))[0]
    _, predicted = torch.max(y_pred, 1)
    test_correct += (predicted == y_batch).sum()
    test_total += len(y_batch)
    
    y_predicted.extend(predicted.cpu().numpy()) # Save Prediction        
    y_true.extend(y_batch.cpu().numpy()) # Save Truth

print('Test Accuracy:', test_correct.float() / test_total)

# constant for classes
classes = (0, 1, 2, 3, 4, 5, 6)

# Build confusion matrix
cf_matrix = confusion_matrix(y_true, y_predicted)
df_cm = pd.DataFrame(cf_matrix/np.sum(cf_matrix) *10, index = [i for i in classes],
                    columns = [i for i in classes])
plt.figure(figsize = (12,7))
sn.heatmap(df_cm, annot=True)
plt.savefig(f'./image/output_{date}.png')