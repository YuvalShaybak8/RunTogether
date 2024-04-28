const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js'); // Assuming you have post routes
const bcrypt = require('bcrypt'); // Import for password hashing
const env = require("dotenv");
const cors = require('cors');


env.config();
const app = express();
const PORT = process.env.PORT || 3030;
const MongoDB = process.env.MongoDB

// Connect to MongoDB
mongoose.connect(MongoDB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Middleware
app.use(express.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));



// Routes
app.use("/post", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => { res.send("hello!") })
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
