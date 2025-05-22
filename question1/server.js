const express = require('express');
const body = require('body-parser');
const averageRoutes = require('./routes/average');
const testingRoutes = require('./routes/numbers');

const app = express();
app.use(body.json());

// Register the required routes here
app.use('/api/average', averageRoutes.default);
app.use('/numbers', testingRoutes.default);

const PORT = 9876;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});