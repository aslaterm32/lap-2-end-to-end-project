const express = require('express');
const cors = require('cors');

const routeLogger = require('./middleware/logger');
const userRouter = require('./routers/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routeLogger);

app.get("/", (req, res) => {
    res.json({
        name: "Book reviews",
        description: "Review your favourite books"
    })
})

app.use("/users", userRouter);

module.exports = app;