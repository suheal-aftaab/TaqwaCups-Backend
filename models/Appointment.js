const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: String,
    time: String,
    gender: String,
    address: String
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
