const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

const userRoutes = require("./route/userRoute");
const patientRoutes = require("./route/patientRoutes");
const userAttendanceRoute = require("./route/userAttendanceRoutes")

const PORT = 8000;
require("./config/db");


app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/patients', patientRoutes);
app.use('/user-attendance', userAttendanceRoute);

app.get('/', (req, res) => res.send('<h1 style="display:flex;height: 100%;align-items: center;justify-content: center;margin:0;">Server Is Running!!!!</h1>'));

app.listen(PORT, () => {
    console.log(`Server is Running on : ${PORT}`)
})