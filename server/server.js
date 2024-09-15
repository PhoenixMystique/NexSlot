const express = require('express');
const eventRoutes = require('./routes/event.route');

const app = express();
app.use(express.json());

app.use('/api', eventRoutes);

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
