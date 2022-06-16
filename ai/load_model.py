from flask import Flask, request
from flask_pymongo import pymongo
from predict_sentence import predict_sentiment_list

app = Flask(__name__)

CONNECTION_STRING = "mongodb+srv://kyunga:song0530@simple-board-cluster.porqq.mongodb.net/?retryWrites=true&w=majority"
myclient = pymongo.MongoClient(CONNECTION_STRING)
mydb = myclient["mindi"]
mycol = mydb["sentiment"]

@app.route('/')
def flask_mongodb_atlas():
    return "flask mongodb atlas!"

@app.route("/users", methods=['GET'] )
def find_user():
    users = list(mycol.find({"age": 40}))
    print(users)
    return "User inquiry completed"

@app.route("/sentiment", methods=['POST'] )
def sentiment_list():
    diary = request.get_json()['diary']
    sentiment_dict = predict_sentiment_list(diary)
    print(sentiment_dict)
    mycol.insert_one(sentiment_dict)
    return "Sentiment analysis completed"

if __name__ == '__main__':
    app.run(port=8000, debug=True)

