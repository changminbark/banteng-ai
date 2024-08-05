import requests
from datetime import datetime
from flask import current_app

def fetch_news(query):
    API_KEY = current_app.config['API_KEY']
    url = f'https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}'
    response = requests.get(url).json()

    print(response)
