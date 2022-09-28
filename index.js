require('dotenv').config();
require('./controller/database');

const express = require('express');
const routes = require('./routes/routes');
const route = require('./routes/index');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use('/', route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});