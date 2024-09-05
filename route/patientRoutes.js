const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController'); // Adjust path as needed

// Add a new patient
router.post('/add', patientController.addOrUpdatePatient);

// Get patient by ApplicationID
router.get('/get/:AadharNo', patientController.getPatientByAadhar);

// Get all patients
router.get('/all', patientController.getAllPatients);

// Update a patient by ApplicationID
router.put('/update/:AadharNo', patientController.updatePatient);

// Delete a patient by ApplicationID
router.delete('/delete/:AadharNo', patientController.deletePatient);

module.exports = router;
