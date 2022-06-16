from flask import Flask, request, jsonify
from flask_pymongo import pymongo
from predict_sentence import predict_sentiment_list

app = Flask(__name__)

CONNECTION_STRING = "mongodb+srv://kyunga:song0530@simple-board-cluster.porqq.mongodb.net/?retryWrites=true&w=majority"
myclient = pymongo.MongoClient(CONNECTION_STRING)
mydb = myclient["mindi"]
mycol = mydb["sentiment"]

@app.route('/')
def main():
    return "Mindi"

@app.route("/sentiment", methods=['POST'] )
def sentiment_list():
    diary = request.get_json()['diary']
    sentiment_dict = predict_sentiment_list(diary)
    print(sentiment_dict)
    print(type(sentiment_dict))
    mycol.insert_one(sentiment_dict)    
    return "Sentiment analysis complted"

if __name__ == '__main__':
    app.run(port=8000, debug=True)

