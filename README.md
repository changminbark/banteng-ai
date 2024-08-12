# Company-Sentiment-AI

This is a personal project that gathers and analyzes news data about specific companies to determine the overall sentiment/portrayal in the media using AI and machine learning models. The project is divided into two main parts: data collection and sentiment analysis.

## Project Overview

### Data Collection (News Fetcher)

Originally, this project scraped headlines from websites like Google News using Puppeteer and cron jobs. However, due to potential legal concerns related to web scraping, I have transitioned to using the [News API](https://newsapi.org/). The News API allows for a more reliable and compliant way to fetch the latest news headlines about companies of interest.

### Sentiment Analysis

The second part of the project focuses on analyzing the collected news data. It uses various AI and machine learning models to classify the sentiment of the news articles. The goal is to determine whether the sentiment is positive, negative, or neutral.

## Technologies Used

- **Python (Flask)**: Backend framework for handling API requests and rendering the web application.
- **News API**: For fetching news articles instead of scraping websites.
- **Pandas**: For data manipulation and analysis.
- **NLP Libraries**: Natural language processing tools for sentiment analysis.
- **scikit-learn**: For implementing machine learning models such as SVC, KNearestNeighbors, DecisionTree, and RandomForest.
- **VSCode**: Code editor.
- **PyCharm**: Python IDE.

## Future Work

- Experiment with different machine learning models and compare their performance.
- Potentially re-implement scraping with proper legal compliance for more advanced data gathering (if necessary).
- Expand the project to analyze sentiment over time and visualize trends.

This project aims to provide insights into how companies are portrayed in the media, leveraging AI to help make sense of large amounts of unstructured data.
