const express = require('express');
const app = express();
const connectDB = require ('./config/db');

//call connect db
connectDB();


app.get('/', (req, res) => res.json('API is works!'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on PORT 5000'));