import express from 'express';
import { Client } from 'elasticsearch';

const app = express();
const esClient = new Client({ node: 'http://localhost:9200' });

app.use(express.json());

app.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required.' });
    }

    const result = await esClient.search({
      index: 'products', // Replace with your actual index name
      body: {
        query: {
          match: {
            product_name: query,
          },
        },
      },
    });

    res.json(result.hits.hits);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
