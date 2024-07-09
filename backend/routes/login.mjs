// login.js
import express from 'express';
import db from '../db/conn.mjs';

const loginRouter = express.Router();

// Middleware to handle errors
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}

// Get a list of login information (example: fetching all logins)
loginRouter.get('/', async (req, res, next) => {
  try {
    const collection = db.collection('ahara-login');
    const results = await collection.find({}).limit(50).toArray();
    
    if (results.length === 0) {
      res.status(404).json({ message: 'No login information found.' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
loginRouter.use(errorHandler);

export default loginRouter;
