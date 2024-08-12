from flask import Blueprint, request, jsonify, render_template

bp = Blueprint('home', __name__, url_prefix='/')


@bp.route('/', methods=['GET'])
def home():
    return render_template('home_index.html')
