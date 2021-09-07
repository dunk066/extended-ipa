
const express = require('express');
const { initParams } = require('request');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.');
})

// GET Product Details

app.get('/products/:productID', async (req, res) => {
    const { productID } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productID}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// GET Product Reviews

app.get('/products/:productID/reviews', async (req, res) => {
    const { productID } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productID}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// GET Product Offers

app.get('/products/:productID/offers', async (req, res) => {
    const { productID } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productID}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// GET Search Results

app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));