const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// const authJwt = require('./helpers/jwt');
require('dotenv').config();

const Product = require('./model/products');


const api = process.env.API_URL;

// //cors
// app.use(cors()); 
// app.options('*', cors());

//middleware

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded());



// Routers
const productsRouter = require('./routes/products');
// const categoriesRouter = require('./routers/categories');
// const userRouter = require('./routers/users');

app.use(`${api}/products` , productsRouter);
// app.use(`${api}/categories` , categoriesRouter);
// app.use(`${api}/users` , userRouter);




app.get('/', (req, res) => {

res.sendFile(__dirname + '/Cua_Hang_My_Pham_Online/index.html');
})



mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'CosmeticsStores' // Specify your database name here
}).then(() => {
    console.log('Database connection is ready...');
}).catch((err) => {
    console.error('Database connection error:', err);
});

const PORT = process.env.PORT || 3002;

 app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
 
// app.js
console.log('Hello, world!');
