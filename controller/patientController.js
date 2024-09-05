const moment = require('moment-timezone');
const Patient = require('../model/patientModel');
const Counter = require('../model/counterModel');

// Add a new patient
exports.addOrUpdatePatient = async (req, res) => {
    const { ApplicationID, PatientName, MobileNo, AGE, Gender, AadharNo, AbhaNo, Residence, Title } = req.body;

    const patient = await Patient.findOne({ AadharNo });
    if (patient) {
        patient.Symptoms.push({
            Title,
            DateTime: moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss')
        });
        const updatedPatient = await patient.save();
        res.status(200).json({
            message: "Symptom added to existing patient",
            patient: updatedPatient
        });
    } else {
        var id;
        const month = moment().format('MM');
        const year = moment().format('YYYY');
        var counter = await Counter.findOne({ Title: `VVCM${year}${month}` });
        if (!counter) {
            counter = new Counter({ Title: `VVCM${year}${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }
        id = `VVCM${year}${month}${counter.Count}`;
        try {
            const newPatient = new Patient({
                ApplicationID: id,
                PatientName,
                MobileNo,
                AGE,
                Gender,
                AadharNo,
                AbhaNo,
                Residence,
                CratedAt: moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss'),
                Symptoms: [{
                    Title,
                    DateTime: moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss')
                }]
            });
            await newPatient.save();
            res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
        } catch (error) {
            res.status(500).json({ message: 'Error creating patient', error: error.message });
            console.log(error)
        }
    }
};

// Get patient by ApplicationID
exports.getPatientByAadhar = async (req, res) => {
    try {
        const patient = await Patient.findOne({ AadharNo: req.params.AadharNo });
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving patient', error: error.message });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        // Retrieve all patients
        const patients = await Patient.find({});

        // Process each patient to include symptoms count and last symptom data
        const processedPatients = patients.map(patient => {
            const symptomCount = patient.Symptoms.length;
            const lastSymptom = symptomCount > 0 ? patient.Symptoms[symptomCount - 1].Title : null;
            const lastVisited = symptomCount > 0 ? patient.Symptoms[symptomCount - 1].DateTime : null;

            return {
                ...patient.toObject(),
                SymptomsCount: symptomCount,
                LastSymptom: lastSymptom,
                LastVisited: lastVisited
            };
        });

        res.status(200).json(processedPatients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a patient by ApplicationID
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findOneAndUpdate(
            { AadharNo: req.params.AadharNo },
            req.body,
            { new: true, runValidators: true }
        );
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json({ message: 'Patient updated successfully', patient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};

// Delete a patient by ApplicationID
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findOneAndDelete({ AadharNo: req.params.AadharNo });
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting patient', error: error.message });
    }
};
