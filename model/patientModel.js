const mongoose = require("mongoose");

const patientModel = new mongoose.Schema({
    ApplicationID: {
        type: String,
        unique: true
    },
    PatientName: {
        type: String,
        required: true,
    },
    MobileNo: {
        type: Number,
        required: true
    },
    AGE: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    AadharNo: {
        type: String,
        required: true
    },
    AbhaNo: {
        type: String,
        required: true
    },
    Residence: {
        type: String,
        required: true
    },
    CratedAt: {
        type: String
    },
    Symptoms: [{
        Title: {
            type: String,
        },
        DateTime: {
            type: String
        }
    }],
});

const Patient = mongoose.model("Patient", patientModel);
module.exports = Patient;