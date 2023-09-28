const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();
const port = 3000;

// MongoDB setup
mongoose.connect(
    "mongodb+srv://sanketmunishwar7:q5WEY4lK4vMAzwbJ@cluster0.0jenlvx.mongodb.net/Assignment?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
 .then(() => console.log("DB is Connected"))
 .catch((err) => console.log(err));

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Import route modules
const authenticationRoutes = require('./routes/auth');
const productsRoutes = require('./routes/product');
const salesRoutes = require('./routes/sales');

// Define routes
app.use('/api', authenticationRoutes);
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
