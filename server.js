const express = require('express');
const RSSParser = require('rss-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const RSS_FEED_URLS = [
  { url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', name: 'The Times of India' },
  { url: 'https://www.thehindu.com/feeder/default.rss', name: 'The Hindu' },
  { url: 'https://www.hindustantimes.com/feeds/rss/latest/rssfeed.xml', name: 'Hindustan Times' },
  { url: 'https://indianexpress.com/feed/', name: 'The Indian Express' },
  { url: 'https://www.amarujala.com/rss/breaking-news.xml', name: 'Amar Ujala' }, 
  { url: 'https://www.dinakaran.com/rss/', name: 'Dinakaran' },
  
];

app.get('/rss', async (req, res) => {
  const parser = new RSSParser();
  try {
    const feedPromises = RSS_FEED_URLS.map(async ({ url, name }) => {
      try {
        const feed = await parser.parseURL(url);
        return feed.items.map(item => ({ ...item, source: name }));
      } catch (innerErr) {
        console.error(`Error fetching or parsing feed from ${url}:`, innerErr.message);
        return []; // Return an empty array in case of error for this feed
      }
    });

    const feedItems = await Promise.all(feedPromises);
    const allItems = feedItems.flat();
    res.json(allItems);
  } catch (err) {
    console.error('Error processing feeds:', err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
