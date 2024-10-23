from flask import Blueprint, request, render_template
import pandas as pd
import requests

from app.services.news_service import fetch_news

bp = Blueprint('news', __name__, url_prefix='/news')


@bp.route('/', methods=['GET'])
def news_home():
    return render_template('news_index.html')


@bp.route('/retrieve', methods=['POST'])
def get_news():
    query = request.form.get('company', default='Apple')
    news = fetch_news(query)
    # TODO: Clean, parse, and remove unnecessary data to be fed into ML model
    df = pd.DataFrame(news)
    df = df[['title', 'description', 'content']]

    mask = (df['title'] == '[Removed]') & (df['description'] == '[Removed]') & (df['content'] == '[Removed]')

    df_filtered = df[~mask]

    print(news)
    print(df)
    print(df_filtered)

    # for article in news:
    #     print(article["title"])
    #     print(article["description"])
    #     print(article["content"])
    #     print()

    return render_template('news_index.html', articles=news)
