import { Client } from 'elasticsearch';
import { Pool } from 'pg';

const esClient = new Client({ node: 'http://localhost:9200' });

const pool = new Pool({
  user: 'shopaisley_user',
  host: 'dpg-cm2bifi1hbls73epecvg-a.oregon-postgres.render.com',
  database: 'shopaisley',
  password: 'qniQ0b9Eurl28kMyehSU0Ddn8qgzQPSm',
  port: 5432,
});

const client = await pool.connect();
// Execute SQL queries to retrieve product data
// ...
client.release();

// Index a document
esClient.index({
  index: 'products',
  body: {
    product_name: 'Example Product',
    // Other product attributes
  },
  type: '',
});
