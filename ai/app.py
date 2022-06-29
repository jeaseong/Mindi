from flask import Flask, request
from predict_sentence import predict_sentiment
from extract_keyword import textrank_keyword
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

@app.route('/')
def main():
    return 'Mindi'

@app.route('/diaries/sentiment', methods=['POST'] )
def sentiment_list():
    feeling = request.get_json()["feeling"]
    sentiment_dict = predict_sentiment(feeling)
    print(sentiment_dict)
    return_data = {
        'success': 'true',
        'result': sentiment_dict
    }
    return return_data

@app.route('/diaries/keywords', methods=['POST'] )
def keyword_list():
    diary = request.get_json()["diary"]
    keywords = textrank_keyword(diary)
    keyword_list = [i for i, _ in keywords]
    print(keyword_list)
    return_data = {
        'success': 'true',
        'result': keyword_list
    }
    return return_data

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)

