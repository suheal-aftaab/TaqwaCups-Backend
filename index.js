
require("dotenv").config();
console.log("📌 Loaded MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// ✅ Import API Routes
const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);

// ✅ Debugging: Show all registered routes
setTimeout(() => {
    console.log("✅ Registered Routes:");
    app._router.stack.forEach((middleware) => {
        if (middleware.route) { 
            console.log(`➡ ${middleware.route.path} [${Object.keys(middleware.route.methods).join(', ').toUpperCase()}]`);
        }
    });
}, 2000);

// ✅ Root Route (For Testing)
app.get("/", (req, res) => {
    res.send("🚀 Taqwa Cups Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
