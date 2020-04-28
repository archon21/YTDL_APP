const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db');
const morgan = require('morgan');

const PORT = process.env.PORT || 8081;
const app = express();

const createApp = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

  app.get('/', (req, res, next) =>
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html')));

  app.get('/videos/:filename', async (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'video.html'));
  });

  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use((err, req, res, next) => {
    console.error(err);
    res.pipe(
      err.status || 500,
      err.message || 'Internal Server Error'
    );
  });
};

const createConnection = () => {
  // console.log(db)
};

const serverListen = () => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
};

const run = async () => {
  await createApp();
  await createConnection();
  await serverListen();
};

run();
