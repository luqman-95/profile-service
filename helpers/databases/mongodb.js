require('dotenv').config();
const debug = require('debug')('profile-service:mongodb');
const mongoose = require('mongoose');

let db;

if (typeof process.env.MONGODB_URL === 'undefined') {
    console.error('WARN: MongoDB connection URL has not been set');
  } else {
    try {
      mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      db = mongoose.connection;
      db.on('error', (error) => console.error(error));
      db.once('open', () => debug('Connected to MongoDB'));
    } catch (error) {
      console.error(error);
    }
}

module.exports = db;