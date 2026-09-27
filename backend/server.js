const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const registrationRoutes = require("./routes/registrationRoutes");

dotenv.config();

const app = express();
const PORT = 5000;

// ================================
// MIDDLEWARE
// ================================

app.use(express.json());

// ================================
// HOME ROUTE
// ================================

app.get("/", (req, res) => {
    res.json({
        message: "MERN College Event Portal Backend is Running"
    });
});

// ================================
// REGISTRATION ROUTES
// ================================

app.use("/api/registrations", registrationRoutes);

// ================================
// MONGODB CONNECTION
// ================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error.message);
    });