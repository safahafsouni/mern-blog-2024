const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const userRoutes = require('./routes/userRoutes');
const {
  errorResponserHandler,
  invalidPathHandler,
} = require('./middleware/errorHandler');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postCategoriesRoutes = require('./routes/postCategoriesRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const corsOptions = { exposedHeaders: '*' };

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/post-categories', postCategoriesRoutes);

// static assets
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.bgCyan.white);
});
