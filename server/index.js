const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const accountRoutes = require('./routes/accounts');
const bookRoutes = require('./routes/books');
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

// insecure connection, educational purpose only
const dbURI = 'mongodb+srv://admin:admin@cluster0.zgcpfrl.mongodb.net/bookstore?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(function(result) {
    console.log('Database is connected');
  })
  .catch((err) => console.log(err));


app.use(cors());

app.get('/', (req, res) => res.send('Hello from homepage.'));

app.listen(port, () => console.log(`Server Running on port: http://localhost:${port}`));

app.use(bodyParser.json());

app.use('/accounts', accountRoutes);
app.use('/books', bookRoutes);