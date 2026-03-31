import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const email = "admin@project.com";
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.registrationNumber);
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
    const date = new Date();
    const joiningYear = date.getFullYear();
    
    // Sample registration number matching project logic: ADM + Year + Dept(01) + Index(000)
    const registrationNumber = `ADM${joiningYear}01000`;

    const newAdmin = new Admin({
      name: "Default Admin",
      email: email,
      password: hashedPassword,
      joiningYear: joiningYear.toString(),
      registrationNumber: registrationNumber,
      department: "C.S.E",
      contactNumber: 1234567890,
      avatar: {
        public_id: "default",
        url: "https://via.placeholder.com/150"
      }
    });

    await newAdmin.save();
    console.log("-----------------------------------------");
    console.log("Admin Created Successfully!");
    console.log("Registration Number:", registrationNumber);
    console.log("Password:", process.env.ADMIN_PASSWORD || "admin123");
    console.log("-----------------------------------------");
    
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
