const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// ✅ GET all appointments
router.get("/", async (req, res) => {
    console.log("📌 GET /api/appointments called");
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.error("❌ Error fetching appointments:", error);
        res.status(500).json({ error: "Failed to fetch appointments" });
    }
});

// ✅ POST a new appointment
router.post("/", async (req, res) => {
    console.log("📌 POST /api/appointments received data:", req.body);
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error("❌ Error saving appointment:", error);
        res.status(500).json({ error: "Failed to book appointment" });
    }
});

module.exports = router;
