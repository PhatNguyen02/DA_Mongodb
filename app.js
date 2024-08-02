const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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
app.use(cors());


// Session setup
// Create a new instance of MongoStore
const mongoStore = new MongoStore({
    mongoUrl: process.env.CONNECTION_STRING, 
    collectionName: 'sessions'
  });
  
  // Use session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
  }));
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.CONNECTION_STRING,
//     collectionName: 'sessions'
//   }),
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 // 1 day
//   }
// }));


// Routers
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
// const categoriesRouter = require('./routers/categories');
// const userRouter = require('./routers/users');

app.use(`${api}/products` , productsRouter);
app.use(`${api}/auth` , authRouter);
// app.use(`${api}/categories` , categoriesRouter);
//app.use(`${api}/users` , userRouter);




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
