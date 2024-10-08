const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

// Increase payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

