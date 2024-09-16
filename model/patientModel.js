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
    Image:{
        type:String,
        
    },
    MobileNo: {
        type: Number,
        required: true
    },
    Emailid:{
        type:String,
        
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
        required: true,
        unique: true
    },
    AbhaNo: {
        type: String,
        unique: true,
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
            required: true
        },
        DateTime: {
            type: String
        }
    }],
    CreatedBy:{
        type:String,
        required:true
    }
});

const Patient = mongoose.model("Patient", patientModel);
module.exports = Patient;