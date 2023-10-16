import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";

const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pannshop',
});

// Parse the request body
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/postproducts", (req, res, next) => {
    const product_name = req.body.product_name;
    const product_description = req.body.product_description;
    const product_price = req.body.product_price;
    const product_image = req.body.product_image;
    const product_type = req.body.product_type;

    const addpost = "INSERT INTO products(product_name, product_description, product_price, product_image, product_type ) VALUES (?,?,?,?,?)";

    db.query(addpost, [product_name, product_description, product_price, product_image, product_type], (err, result) => {
        if (err) {
            console.error("Error while inserting data:", err);
            return next(err);
        } else {
            console.log("Data inserted successfully");
            res.status(200).json({ message: "Data inserted successfully" });
        }
    });
});

export default router;
