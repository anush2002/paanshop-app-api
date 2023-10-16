import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

import dbconnection from "./dbconnection/db.js";
import postproduct_routes from './routes/postproduct_routes.js';

const app = express();
const port = 8005;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the routes
app.use('/db', dbconnection);
app.use('/postproducts', postproduct_routes); // Updated route path

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pannshop',
});

db.connect((err) => {
  if (err) {
      console.log("Error connecting to the database");
  } else {
      console.log("Connected to the database successfully");}
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
