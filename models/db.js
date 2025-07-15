
// mongo connneciton -

   const mongoose =require("mongoose");
   const bcrypt =require ('bcrypt')
   const { College, Admin, CollegeDetails }  = require("./college");

   const mongoURI = "mongodb+srv://collegezania:Zania%402015@collegezania.0zlz1.mongodb.net/Collegezania";
  
 async function connectDB(){
  try{
    await mongoose.connect(mongoURI,{
    });
  console.log("connected to MongoDB");
 
// Add New College Manually

  const CollegeToInsert =[
    {
    name:"IIT deoria",
    city:"Deoria",
    pincode:123456,
    telephone:9096423425,
    mobile:9096423425,
    email:"satyam@gmail.com",
    companyEmail:"satyam",
    website: "iitgkp.com",
    fees:"20,000",
    College_details:"good one",
    Contact_person:"satyam",
  },

  // adding one more for NCR-

  {
      name:"school",
      city:"satyam",
      pincode:"401401"
  },
    {
      name:"Delhi University",
      city:"New Delhi",
    },

];

// Save both colleges properly -

   await CollegeDetails.insertMany(CollegeToInsert);
       console.log("college inserted");
}catch(err){
  console.error("not established", err);
}
 }

// calling the function-

connectDB();

// Exporting the Model-
   module.exports = College;
  