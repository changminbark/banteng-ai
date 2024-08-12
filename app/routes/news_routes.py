from flask import Blueprint, request, render_template
import requests

from app.services.news_service import fetch_news

bp = Blueprint('news', __name__, url_prefix='/news')


@bp.route('/', methods=['GET'])
def news_home():
    return render_template('news_index.html')


@bp.route('/retrieve', methods=['POST'])
def get_news():
    query = request.form.get('company', 'Apple')
    news = fetch_news(query)
    return render_template('news_index.html', articles=news)
