from flask import Flask, request
from flask_cors import CORS
from predict_sentence import predict_sentiment
from extract_keyword import textrank_keyword
from music_recommend import recommend_music, get_search_response, get_video_info


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

@app.route('/diaries/music', methods=['GET'] )
def music_youtube():
    sentiment = request.args["sentiment"]
    track, artist = recommend_music(sentiment)
    print("sentiment:", sentiment, "\ntrack:", track, "\nartist:", artist)
    
    search_response = get_search_response(artist, track)
    music = get_video_info(search_response)
    print(music)
    return_data = {
        'success': 'true',
        'result': music
    }
    return return_data

if __name__ == '__main__':
    app.run(port=8000, debug=True)

