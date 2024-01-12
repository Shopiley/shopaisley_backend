import express from 'express';
import { Pool } from 'pg';
import { Client } from '@elastic/elasticsearch';

const router = express.Router();

const pgConfig = {
  user: 'your_pg_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
};

const pgPool = new Pool(pgConfig);

const esClient = new Client({ node: 'http://localhost:9200' });

router.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    // Search in PostgreSQL
    const pgResult = await pgPool.query(
      'SELECT * FROM products WHERE name ILIKE $1',
      [`%${query}%`]
    );

    // Search in Elastic Search
    const esResult = await esClient.search({
      index: 'your_index_name',
      body: {
        query: {
          match: {
            name: query,
          },
        },
      },
    });

    const results = {
      postgresResults: pgResult.rows,
      elasticResults: esResult.body.hits.hits,
    };

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
