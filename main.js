require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");

const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 8000;

(async () => {
    try {
        const client = await MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true, useNewUrlParser: true });
        const db = client.db("Code4Community");
        const coll = db.collection("projects");

        app.locals.db = db;
        app.locals.coll = coll;

        console.log("Connected to database");

        // Middleware
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use(session({
            secret: "secret key",
            saveUninitialized: true,
            resave: false
        }));

        app.use((req, res, next) => {
            res.locals.message = req.session.message;
            delete req.session.message;
            next();
        });

        app.use(express.static("images"));

        app.use("", require("./routes/routes"));

        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "views"));
        
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to database", error);
    }
})();
