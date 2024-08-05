# Initialize the Flask app and sets up configurations
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app(config_filename):
    app = Flask(__name__)
    # Load in config from config.py
    app.config.from_object(config_filename)

    with app.app_context():
        from .routes import news_routes
        app.register_blueprint(news_routes.bp)
    # Look into connecting to PostgreSQL database (maybe using SQLAlchemy)

    return app

