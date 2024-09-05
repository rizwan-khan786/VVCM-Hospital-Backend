const mongoose = require("mongoose");

const URL = "mongodb+srv://root:root@cluster0.ca2cg9i.mongodb.net/VVCMHospital?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URL).then(()=>console.log('!!MongoDB Connected!!')).catch((err)=> console.log(err.message));