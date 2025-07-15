
const mongoose =require('mongoose');

  const collegeSchema = new mongoose.Schema({
       college_name:String,
       city:String,
       pincode:Number,
       locality:String,
       telephone:Number,
       mobile:Number,
       email:String,
       college_email:String,
       website:String,
       contact_person:String,
       changes:String,
       image:String,
       college_description:String,
       status:{ type:String, default:'pending'}
  },{ collection : "College_details"});

     const CollegeDetails = mongoose.model('College_details', collegeSchema);

// Here we are writing a Admin Schema-

   module.exports = { CollegeDetails };