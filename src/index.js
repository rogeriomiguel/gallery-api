const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const App = express();
App.use(express.json());

mongoose.connect('mongodb://localhost/gallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

App.use('/v1', routes);

App.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor rodando na porta 3333');
});
