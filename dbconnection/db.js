import express from "express";
import mysql from "mysql";
const router = express.Router();

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
        console.log("Connected to the database successfully");

        const productTable = `
            CREATE TABLE IF NOT EXISTS products (
                product_id INT AUTO_INCREMENT PRIMARY KEY,
                product_name VARCHAR(100) NOT NULL,
                product_description TEXT NOT NULL,
                product_price DECIMAL(10, 2) NOT NULL,
                product_image VARCHAR(100) NOT NULL,
                product_type VARCHAR(100) NOT NULL
            )`;

        const usersTable = `
            CREATE TABLE IF NOT EXISTS users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(100) NOT NULL,
                user_email VARCHAR(100) NOT NULL,
                user_contact VARCHAR(100) NOT NULL,
                user_address VARCHAR(100) NOT NULL
            )`;

            const orderTable = `
            CREATE TABLE IF NOT EXISTS orders (
                order_id INT PRIMARY KEY,
                user_id INT,
                order_date DATE,
                total_amount DECIMAL(10, 2),
                shipping_address VARCHAR(255),
                payment_method VARCHAR(50),
                payment_status VARCHAR(50),
                order_status VARCHAR(20),
                delivery_date DATE,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )`;
        

        db.query(productTable, (error, results) => {
            if (error) {
                console.log("Error creating the 'products' table:", error);
            } else {
                console.log("Table 'products' created or already exists.");
            }
        });

        db.query(usersTable, (error, results) => {
            if (error) {
                console.log("Error creating the 'users' table:", error);
            } else {
                console.log("Table 'users' created or already exists.");
            }
        });

        db.query(orderTable, (error, results) => {
            if (error) {
                console.log("Error creating the 'orders' table:", error);
            } else {
                console.log("Table 'orders' created or already exists.");
            }
        });
     
    }
});

export default router;
