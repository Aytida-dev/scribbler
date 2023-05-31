const express = require('express');
const app = express();
require('dotenv').config();
const { db } = require('./db');
app.use(express.json());
const port = process.env.PORT 

//add cors
const cors = require('cors');
app.use(cors());

const { userRouter } = require('./routes/userRoutes');
const { blogRouter } = require('./routes/blogRoutes');

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.get('/', (req, res) => {
    res.send({
        message: "server running smoothly"
    })
})

app.listen(port, async () => {
    try {
        await db;
        console.log("Connected to mongoDB");
    }
    catch (err) {
        console.log(err);
    }

    console.log(`Server started on port ${port}`);
})