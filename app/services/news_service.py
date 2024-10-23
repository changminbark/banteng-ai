import requests
import datetime as DT
from flask import current_app


def fetch_news(query):
    search_query = "+" + query + "%20Company"
    # print(search_query)
    api_key = current_app.config['API_KEY']
    today = DT.date.today()
    week_ago = today - DT.timedelta(days=7)
    url = f'https://newsapi.org/v2/everything?q={search_query}&searchIn=title,description&from={week_ago}&to={today}&language=en&sortBy=relevancy&apiKey={api_key}'
    response = requests.get(url).json()

    # print(response)
    return response["articles"]
