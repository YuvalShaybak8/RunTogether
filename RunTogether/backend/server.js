import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import env from "dotenv"

env.config();
const app = express();
const PORT = process.env.PORT || 3030;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/RunTogether', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/post", postRoutes)
app.use("/user", userRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
