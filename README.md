# Company-Sentiment-AI

This is a personal project that (may periodically) scrape and parse data about a certain company from a certain website 
like Google News and then uses an AI (NLP) or classification model to determine the overall sentiment/portrayal of the 
company in the news. This project will be divided into two parts.

The first part will be the scraping/parsing component.

The second part will be the analysis component.

## First Part (Scraper/Parser)

If the website I am scraping (such as Google News) requires a lot of JavaScript to function, then I will use NodeJS
and Puppeteer to parse/scrape the site. If the website doesn't require JS, then Beautiful Soup and Pandas.

For the automated function (if I am to implement it), I will use Cron.

NOTE: I might just make both types of scrapers (just for the experience) after finishing the second part (analyzer).

NOTE: Puppeteer Scraper for Google News was inspired by work done by Lewis Donovan (https://github.com/lewisdonovan/google-news-scraper/tree/master)

## Second Part (Analyzer)

I will test whether a classification model (like SVC, KNearestNeighbors, DecisionTree, RandomForest, etc.)or an AI 
model (like an NLP, Deep Learning Neural Network, etc.).

## Technologies Used
- npm
- Node.js
- Express.js
- Express Generator (Pug Template Engine)
- Puppeteer
- Cron
- VSCode
- PyCharm