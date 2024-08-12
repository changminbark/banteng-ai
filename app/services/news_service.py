import requests
from datetime import datetime
from flask import current_app


def fetch_news(query):
    api_key = current_app.config['API_KEY']
    url = f'https://newsapi.org/v2/everything?q={query}&apiKey={api_key}'
    response = requests.get(url).json()

    print(response)
    return response["articles"]
