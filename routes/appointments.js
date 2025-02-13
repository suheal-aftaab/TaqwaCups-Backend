const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const PDFDocument = require("pdfkit");
const fs = require("fs");

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

// ✅ Generate and Download PDF Receipt
router.get("/receipt/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        const doc = new PDFDocument();
        const filename = `receipt_${appointment._id}.pdf`;
        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);
        doc.fontSize(18).text("Taqwa Cups - Appointment Receipt", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Name: ${appointment.name}`);
        doc.text(`Phone: ${appointment.phone}`);
        doc.text(`Date: ${appointment.date}`);
        doc.text(`Time: ${appointment.time}`);
        doc.text(`Gender: ${appointment.gender}`);
        doc.text(`Address: ${appointment.address}`);
        doc.end();
    } catch (error) {
        console.error("❌ Error generating receipt:", error);
        res.status(500).json({ error: "Failed to generate receipt" });
    }
});

module.exports = router;
