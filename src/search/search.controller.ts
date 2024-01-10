/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();

const dbConfig = {
  user: 'shopaisley_user',
  host: 'localhost',
  database: 'shopaisley',
  password: 'qniQ0b9Eurl28kMyehSU0Ddn8qgzQPSm',
  port: 5432,
};

const pool = new Pool(dbConfig);

const searchController = async (req: Request, res: Response) => {
  const keyword: string = req.query.keyword as string;
  const category: string = req.query.category as string;

  if (!keyword) {
    return res
      .status(400)
      .json({ error: 'Invalid input: Keyword is required.' });
  }

  try {
    let query = `
      SELECT products.*, categories.category_name
      FROM products
      LEFT JOIN categories ON products.category_id = categories.category_id
      WHERE to_tsvector('english', products.product_name || ' ' || products.description) @@ to_tsquery('english', $1)
    `;

    const queryParams = [keyword];

    if (category) {
      query += ' AND categories.category_name = $2';
      queryParams.push(category);
    }

    const result = await pool.query(query, queryParams);

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
