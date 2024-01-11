module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'shopaisley_user',
    password: process.env.DB_PASSWORD || 'qniQ0b9Eurl28kMyehSU0Ddn8qgzQPSm',
    database: process.env.DB_NAME || 'shopaisley',
    entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: true, // Set to false in production
  };
  