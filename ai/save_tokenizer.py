from transformers import ElectraTokenizer

def save_tokenizer(path):
    tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")
    tokenizer.save_pretrained(f'./model/{path}')

save_tokenizer('model_2022-06-14_acc0.67.pt')