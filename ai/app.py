from flask import Flask, request
from predict_sentence import predict_sentiment
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

@app.route('/')
def main():
    return 'Mindi'

@app.route('/diaries/sentiment', methods=['POST'] )
@cross_origin()
def sentiment_list():
    diary = request.get_json()['diary']
    sentiment_dict = predict_sentiment(diary)
    print(sentiment_dict)
    return_data = {
        'success': 'true',
        'result': sentiment_dict
    }
    return return_data

if __name__ == '__main__':
    app.run(port=8000, debug=True)

