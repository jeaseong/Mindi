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

# 1. GPU enabled
device = torch.device('cuda')
# check if the gpu is available
cpu_tensor = torch.zeros(2,3)
if torch.cuda.is_available():  
  gpu_tensor = cpu_tensor.to(device)
  print(gpu_tensor)
else:
    print("gpu사용이 가능한지 확인해주세요")

# 2. Load Dataset
class LoadDataset(Dataset):
  
  def __init__(self, csv_file):
    # csv_file 읽어오기
    self.dataset = pd.read_csv(csv_file, encoding='cp949') 
    
    # 중복제거
    self.dataset.drop_duplicates(subset=['Sentence'], inplace=True, ignore_index = True)
    
    # Sentence 전처리
    # 여러가지 키보드상 특수문자 제거
    self.dataset['Sentence'] = self.dataset['Sentence'].str.replace("[\{\}\[\]\/?.,;:|\)*~`·!^\-_+<>@\#$%&\\\=\(\'\"]", " ", regex = True)
    # 공백 제거
    self.dataset['Sentence'] = self.dataset['Sentence'].str.strip()

    # label 정수로 변경
    label_dict = {'공포': 0, '놀람':1, '분노':2, '슬픔':3, '중립':4, '행복':5, '혐오':6}
    self.dataset["Label"] = self.dataset["Emotion"].map(label_dict)

    # tokenizer 설정
    self.tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")

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
        max_length=128,
        padding='max_length',
        add_special_tokens=True
        )
    
    input_ids = inputs['input_ids'][0]
    attention_mask = inputs['attention_mask'][0]

    return input_ids, attention_mask, label

# 3. split dataset into train, validation, test
dataset = LoadDataset("./dataset/conversation_all.csv")
dataset_size = len(dataset)
train_size = int(dataset_size * 0.8)
validation_size = int(dataset_size * 0.1)
test_size = dataset_size - train_size - validation_size

train_dataset, validation_dataset, test_dataset = random_split(dataset, [train_size, validation_size, test_size])

# 4. Import KoElcetra model
num_labels = 7
model = ElectraForSequenceClassification.from_pretrained("monologg/koelectra-base-v3-discriminator", num_labels=num_labels, problem_type="multi_label_classification").to(device)

# 5. Train model
# model save  function
def saveModel(epoch, date, accuracy): 
    acc = np.round(accuracy.cpu().numpy(), 4)
    path = f"./model/model_{date}_epoch{epoch}_acc{acc}.pt" 
    model.save_pretrained(path)

# hyperparameter
date = datetime.datetime.now().date()
epochs = 15
batch_size = 32
optimizer = AdamW(model.parameters(), lr=5e-5)

# dataloader
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=True)
validation_loader = DataLoader(validation_dataset, batch_size=batch_size, shuffle=True, drop_last=True)
test_loader = DataLoader(test_dataset, batch_size=batch_size , shuffle=True, drop_last=True)

# train model
def train_model():
    losses = []
    accuracies = []
    valid_losses = []
    valid_accuracies = []
    best_accuracy = 0

    for i in range(epochs):
        total_loss = 0.0    
        correct = 0
        total = 0
        
        valid_loss = 0.0
        valid_correct = 0
        valid_total = 0

        batches = 0

        model.train()

        for input_ids_batch, attention_masks_batch, y_batch in tqdm(train_loader):
            optimizer.zero_grad()
            y_batch = y_batch.to(device)
            y_pred = model(input_ids_batch.to(device), attention_mask=attention_masks_batch.to(device))[0]
            loss = F.cross_entropy(y_pred, y_batch.long())
            loss.backward()
            optimizer.step()

            total_loss += loss.item()

            _, predicted = torch.max(y_pred, 1)
            correct += (predicted == y_batch).sum()
            total += len(y_batch)

            batches += 1
            if batches % 100 == 0:
                print("Batch Loss:", total_loss, "Accuracy:", correct.float() / total)
    
        losses.append(total_loss)
        accuracies.append(correct.float() / total)
        print("Train Loss:", total_loss, "Train Accuracy:", correct.float() / total)

        model.eval()
        with torch.no_grad():
            for input_ids_batch, attention_masks_batch, y_batch in tqdm(validation_loader):
                y_batch = y_batch.to(device)
                y_pred = model(input_ids_batch.to(device), attention_mask=attention_masks_batch.to(device))[0]
                loss = F.cross_entropy(y_pred, y_batch.long())
                valid_loss += loss.item()

                _, predicted = torch.max(y_pred, 1)
                valid_correct += (predicted == y_batch).sum()
                valid_total += len(y_batch)
        
        valid_losses.append(valid_loss)
        valid_accuracy = valid_correct.float() / valid_total
        valid_accuracies.append(valid_accuracy)

        if valid_accuracy > best_accuracy:
            saveModel(i, date, valid_accuracy)
            best_accuracy = valid_accuracy
        print("epoch:", i, "Validation Loss:", valid_loss, "Validation Accuracy:", valid_accuracy)
    return losses, accuracies, valid_losses, valid_accuracies

losses, accuracies, valid_losses, valid_accuracies = train_model()
print(losses, accuracies, valid_losses, valid_accuracies)

# save final version model
model.save_pretrained(f'./model/model_{date}_final.pt')

# 6. Test model
def test_model():
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

    print("Test Accuracy:", test_correct.float() / test_total)

    # constant for classes
    classes = (0, 1, 2, 3, 4, 5, 6)

    # Build confusion matrix
    cf_matrix = confusion_matrix(y_true, y_predicted)
    df_cm = pd.DataFrame(cf_matrix/np.sum(cf_matrix) *10, index = [i for i in classes],
                        columns = [i for i in classes])
    plt.figure(figsize = (12,7))
    sn.heatmap(df_cm, annot=True)
    plt.savefig(f"./image/output_{date}.png")

test_model()

# 7. Predict Sentence
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

def predict_setiment(sent):
    label_dict = {0: '공포', 1: '놀람', 2: '분노', 3: '슬픔', 4: '중립', 5: '행복', 6: '혐오'}
    model.eval()

    input_ids, attention_mask = convert_input_data(sent)
    y_pred = model(input_ids.unsqueeze(0).to(device), attention_mask=attention_mask.unsqueeze(0).to(device))[0]
    _, predicted = torch.max(y_pred, 1)
    setiment = label_dict[predicted.item()]
    return setiment

print(predict_setiment("정해진 시간을 지키지 못해서 속상했다"))