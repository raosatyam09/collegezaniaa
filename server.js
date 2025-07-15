const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const path = require("path");
const excelToJson = require('convert-excel-to-json');
const fs = require("fs");
const session=require('express-session');
const bcrypt=require('bcrypt');
const app = express();
const mongoose = require('mongoose');
const PORT = 8000;
const adminRoute =require("./routes/adminRoute");
require('dotenv').config();
const nodemailer =require('nodemailer');
const { CollegeDetails} =require('./models/college');

// all the middleware-
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/admin", adminRoute);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

// nodemailer----
const transporter =nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});

//  const baseURL =process.env.NODE_ENV ==="production"
  //  ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL;

function sendEmail(formData){
   return new Promise((resolve,reject) =>{
    const approvalLink =`http://localhost:8000/approve?email=${formData.email}&status=approved`;
    const rejectLink =`http://localhost:8000/approve?email=${formData.email}&status=rejected`;
   
    const mailOptions = {
      from:process.env.EMAIL_USER,
      to:'contactcollegezania@gmail.com',
      subject:'College Request Form',
      text:`Form Details:\n\n${JSON.stringify(formData,null,2)}\n\nActions:\n  ✅Approve:${approvalLink}\n  ❌Reject:${rejectLink}`
    };

    transporter.sendMail(mailOptions,(error,info) => {
      if (error){
        console.log("Email sending Error:",error);
        reject(error);
      } else{
        console.log('Email sent:', info.response);
        resolve(info.response);
      };
    });
 });
}

// creating route for submit form to send on mail:

app.post('/submit', async (req, res) => {
  try {
    const formData = req.body;
    console.log("📦 Received Data:", formData);

    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({ error: "No data received" });
    }

    // 2. Save to MongoDB
    const newCollege = new CollegeDetails(formData);
    await newCollege.save();

    // just pass ID to email function-
     await sendEmail(req.body, newCollege._id);

    res.status(200).json({ message: " Form submitted: Email sent to admin ✅" });
  } catch (error) {
    console.error("❌ Submit Route Error:", error);
    res.status(500).json({ error: "Unexpected error occurred." });
  }
});

//  Insert College Data in mogoDB-

  const mongoURI = "mongodb+srv://collegezania:Zania%402015@collegezania.0zlz1.mongodb.net/Collegezania"
  mongoose.connect (mongoURI,{
   
  })
  .then(() =>{
      console.log("connected to mongoDB");
  }).catch((err) => {
    console.error("mongo error",err);
  });

app.get("/approve", async (req, res) => {
     console.log("approve route working ",req.query);
  const { email, status } = req.query;

  if (!email || !status) {
    return res.status(400).send("Missing email or status.");
  }

  try {
    const result = await CollegeDetails.findOneAndUpdate(
      { email:email },
      { status:status },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("College not found.");
    }

    res.send(`✅ College status updated to "${status}"`);
  } catch (err) {
    console.error("❌ Approval Error:", err);
    res.status(500).send("Something went wrong.");
  }
});


// Creating Route for Rejection of form -
 app.get('/reject/:id', async (req,res) =>{
  try{
    const {id} =req.params;
    await CollegeDetails.findByIdAndUpdate(id, {status:'rejected'});
    res.send("College Form rejected");
  } catch(err){
    res.status(500).send("Error rejecting form");
  }
 });

// Route to serve about page-

app.get('/about',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','collegezania','about','aboutus.html'))
})

// Route to server terms and conditions-

app.get('/terms',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','collegezania','terms.html'))
});

// Route to server contact us 

app.get('/contact',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','collegezania','about.html'));
});

// Creatign a Route for get approved colleges from MongoDB-

  app.get("/api/approved-collges", async (req,res) =>{
    try{
      const approvedColleges =await college_name.find({ status:"approved"});
      res.status(200).json(approvedColleges);
    }  catch (error){
      console.error("Error fetching approved colleges:",error);
         res.status(500).json({error:"Failed to fetch approved colleges"});
    }
  });

// Route to server blog file

app.get('/blogs',(req,res) => {
  res.sendFile(path.join(__dirname,'public','collegezania','blog.html'));
});

// Route to server article.html

app.get('/article',(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'collegezania','article1.html'));
});

// Route to server article2.html

app.get('/article',(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'collegezania','article2.html'));
});

// Route to server article3.html

app.get('/article', (req,res)=>{
  res.sendFile(path.join(__dirname,'public','collegezania','article3.html'));
});

// Route to server article4.html

app.get('/article', (req,res)=>{
  res.sendFile(path.join(__dirname,'public','collegezania','article4.html'));
});
       // Read Excel files

const workbook = XLSX.readFile("./excel_data/state_city.xlsx");
const collegeWorkbook = XLSX.readFile("./excel_data/All_colleges_list.xlsx");
const collegeDetailsWorkbook =XLSX.readFile("./excel_data/aalist.xlsx");
console.log("available :", collegeDetailsWorkbook.SheetNames);

// Ensure workbooks have sheets

if (!workbook.SheetNames.length) {
  console.error("No sheets found in the state-city workbook.");
  process.exit(1);
}
if (!collegeWorkbook.SheetNames.length) {
  console.error("No sheets found in the colleges workbook.");
  process.exit(1);
}

// Parse data from the Excel sheets

const sheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = XLSX.utils.sheet_to_json(sheet);
const collegeSheet = collegeWorkbook.Sheets[collegeWorkbook.SheetNames[0]];
const collegeData = XLSX.utils.sheet_to_json(collegeSheet);

// API to get data of state and cities

app.get("/api/data", (req, res) => {
  const structuredData = {};
  excelData.forEach((row) => {
    const state = row.State;
    const cities = row.City.split(",").map((city) => city.trim());

    if (!structuredData[state]) {
      structuredData[state] = { cities: [] };
    }
    cities.forEach((city) => {
      if (!structuredData[state].cities.includes(city)) {
        structuredData[state].cities.push(city);
      }
    });
  });
  res.json(structuredData);
});

// API to get random colleges

app.get("/api/random-colleges", (req, res) => {
  const numRandom = 20;
  const headers = Object.keys(collegeData[0]);
  let allColleges = [];

  collegeData.forEach((row) => {
    headers.forEach((course) => {
      if (row[course]) {
        allColleges.push({ name: row[course], course: course });
      }
    });
  });
 const shuffled = allColleges.sort(() => 0.5 - Math.random());
  const randomColleges = shuffled.slice(0, numRandom);
  res.json(randomColleges);
});

// API to get colleges for a specific course

app.get("/api/colleges", (req, res) => {
  const course = req.query.course;
  if (!course) {
    return res.status(400).json({ error: "Course is required." });
  }

  const headers = Object.keys(collegeData[0]);
  if (!headers.includes(course)) {
    return res.status(400).json({ error: `Course "${course}" not found in the Excel sheet.` });
  }

  const colleges = collegeData.map((row) => row[course]).filter((college) => college);
  if (colleges.length === 0) {
    return res.status(404).json({ error: `No colleges found for the course "${course}".` });
  }
  res.json(colleges);
});

// Load college details from Excel file

const collegeDetails = excelToJson({
  sourceFile: './excel_data/aalist.xlsx',
   sheets:['sheet1'],
  header: { rows: 2 },
  columnToKey: {
    A: 'name',
    E: 'telephone',
    F: 'mobile',
    G: 'email',
    H: 'CompanyEmail',
    I: 'Website'
  }
}) ['sheet1'];
console.log("Loaded College Details:", collegeDetails);
console.log(collegeDetails);
app.use((req,res,next)=>{
  console.log(`received request: ${req.method} ${req.url}`);
  next();
});

// API to get college details-

app.get('/api/college-details', (req, res) => {
  if (!collegeDetails) {
    console.error("College details data is undefined.");
    return res.status(500).json({ error: "Internal Server Error. College details data is missing." });
  }
  const collegeName = req.query.name;
  if (!collegeName) {
    return res.status(400).json({ error: "College name is required." });
  }
  const collegeData =collegeDetails.find(college => {
    let collegeNameFromSheet = String(college['name']|| "").trim().toLowerCase();
    return collegeNameFromSheet.includes(collegeName.trim().toLowerCase());
  });
  if (collegeData) {
    res.json({ college: collegeData });
  } else {
    console.error(`College not found: ${collegeName}`);
    res.status(404).json({ error: "College not found." });
  }
});

// Serve the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Collegezania", "index.html"));
});

// Serve the main page when accessing '/collegezania'

app.get("/public", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "course.html"));
});

// Serve the course page
app.get("/course", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "course.html"));
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
