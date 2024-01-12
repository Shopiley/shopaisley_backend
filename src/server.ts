import express from 'express';
import searchRoutes from './routes/searchRoutes';

const app = express();
const port = 3000;

// Use the searchRoutes for the /api endpoint
app.use('/api', searchRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
