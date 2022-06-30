from flask import Flask, request
from flask_cors import CORS
from predict_sentence import predict_sentiment
from extract_keyword import textrank_keyword
from music_recommend import recommend_music, get_search_response, get_video_info

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

@app.errorhandler(KeyError)
def handler_key_error(err):
    return_data = {
        'massage': f'KEY_ERROR: {err} 값을 가져오는데 문제가 발생하였습니다.'
    }
    return return_data, 400

@app.route('/')
def main():
    return 'Mindi'

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

@app.route('/diaries/sentiment', methods=['POST'] )
def result_page():
    feeling = request.get_json()["feeling"]
    sentiment_dict = predict_sentiment(feeling)
    print(sentiment_dict)

    max_sentiment = max(sentiment_dict,key=sentiment_dict.get)
    track, artist = recommend_music(max_sentiment)
    print("sentiment:", max_sentiment, "\ntrack:", track, "\nartist:", artist)
    
    search_response = get_search_response(artist, track)
    videoId = get_video_info(search_response)
    print("videoId", videoId)
    return_data = {
        'success': 'true',
        'result': {
            "sentiment_dict": sentiment_dict,
            "videoId": videoId
        }
    }
    return return_data

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)

