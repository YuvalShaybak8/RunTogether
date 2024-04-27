const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js'); // Assuming you have post routes
const bcrypt = require('bcrypt'); // Import for password hashing
const env = require("dotenv");
const cors = require('cors');
const { createUser } = require('./controllers/userController.js');


env.config();
const app = express();
const PORT = process.env.PORT || 3030;

// Connect to MongoDB
mongoose.connect('mongodb+srv://taloreff:UjaEKiqzPivYp6CD@cluster0.6hrapzc.mongodb.net/RunTogether')
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
//app.use("/post", postRoutes); // Assuming you have post routes
app.use("/user", userRoutes);

app.get("/", (req, res) => { res.send("hello!") })
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
