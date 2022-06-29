import os 
from dotenv import load_dotenv
import pandas as pd
from googleapiclient.discovery import build

load_dotenv()

# 1. Youtube setting
DEVELOPER_KEY = os.environ.get('YOUTUBE_API')
YOUTUBE_API_SERVICE_NAME="youtube"
YOUTUBE_API_VERSION="v3"
youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)

def get_search_response(artist, title):
    search_response = youtube.search().list(
        q = artist+ " " + title,
        order = "relevance",
        part = "snippet",
        maxResults = 1
    ).execute()
    return search_response

def info_to_dict(videoId, title, description, url):
    result = {
        "videoId": videoId,
        "title": title,
        "description": description,
        "url": url
    }
    return result

def get_video_info(search_response):
    item = search_response['items'][0]
    if item['id']['kind'] == 'youtube#video':
        result = item['id']['videoId']
    return result

# 2. Music recommend
music_df = pd.read_csv("./dataset/music.csv")
music_df = music_df.drop("Unnamed: 0", axis = 1)

def recommend_music(sentiment):
    music = music_df[music_df["sentiment"] == sentiment].sample(1)
    return music["track"].to_list()[0], music["artist"].to_list()[0]

if __name__ == "__main__":
    track, artist = recommend_music("happiness")
    print("track:", track, "\nartist:", artist)

    search_response = get_search_response(artist, track)
    result = get_video_info(search_response)
    print(result)