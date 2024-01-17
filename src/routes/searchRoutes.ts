import express from 'express';
import { Pool } from 'pg';
import { Client } from 'elasticsearch';

const router = express.Router();

const pgConfig = {
  user: 'shopaisley_user',
  host: 'dpg-cm2bifi1hbls73epecvg-a.oregon-postgres.render.com',
  database: 'shopaisley',
  password: 'qniQ0b9Eurl28kMyehSU0Ddn8qgzQPSm',
  port: 5432,
};

const pgPool = new Pool(pgConfig);

const esClient = new Client({ nodesToHostCallback: 'http://localhost:9200' });

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
      elasticResults: esResult.hits.hits,
    };

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
