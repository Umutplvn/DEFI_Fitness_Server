"use strict"
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

/*--------------------------------------*/
app.use(require('cors')());
app.use("/api", require("./src/routes/stripe"));
app.use(express.json());

/*--------------------------------------*/
//! Connect to MongoDB with Mongoose:
require('./src/configs/dbConnection');

//! Authorization Middleware
app.use(require("./src/middlewares/authorization"));

/*--------------------------------------*/
//! Searching&Sorting&Pagination:
app.use(require('./src/middlewares/findSearchSortPage'));

/*--------------------------------------*/

//! Home Page
app.all('/', (req, res) => {
    res.send({
        err: false,
        message: 'Welcome to DEFI APP',
    });
});

/*--------------------------------------*/
//! Routes:
app.use("/users", require("./src/routes/user"));
app.use("/auth", require("./src/routes/auth"));
app.use("/blog", require("./src/routes/blog"));
app.use("/comment", require("./src/routes/comment"));
app.use("/bmi", require("./src/routes/bmi"));
app.use("/pr", require("./src/routes/pr"));
app.use("/size", require("./src/routes/size"));

/*--------------------------------------*/
//! errorHandler:
app.use(require('./src/errorHandler'));

/*--------------------------------------*/
app.listen(PORT, () => console.log(`App is running: ${HOST}:${PORT}`));
