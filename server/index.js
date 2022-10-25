const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database Connected Success!")
}).catch((err) => {
    console.log(err.message);
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});