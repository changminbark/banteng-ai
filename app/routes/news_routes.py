from flask import Blueprint, request, jsonify, render_template
import requests

from app.services.news_service import fetch_news

bp = Blueprint('news', __name__, url_prefix='/news')

@bp.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@bp.route('/retrieve', methods=['POST'])
def get_news():
    query = request.form.get('company', 'Apple')
    articles = fetch_news(query)

