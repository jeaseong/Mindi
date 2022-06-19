from flask import Flask, request
from flask_cors import CORS
from predict_sentence import predict_sentiment

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

CORS(app, supports_credentials=True, resources={r'*': {'origins': "http://localhost:3000"}})


@app.route('/')
def main():
    return 'Mindi'


@app.route('/diaries/sentiment', methods=['POST'])
def sentiment_list():
#    diary = request.get_json()['diary']
    diary = request.get_json()
    sentiment_dict = predict_sentiment(diary)
    print(sentiment_dict)
    return_data = {
        'success': 'true',
        'result': sentiment_dict
    }
    return return_data


if __name__ == '__main__':
    app.run(port=8000, debug=True)

