# Initialize the Flask app and sets up configurations
from flask import Flask

def create_app():
    app = Flask(__name__)
    # Load in config from config.py
    app.config.from_object('app.config.Config')

    # Look into connecting to PostgreSQL database (maybe using SQLAlchemy)

    return app

