require("dotenv").config();
const express = require("express");
const app = express(); 
const cors = require("cors");
app.use(express.json());

const connectDb = require("./config/dbconfig");
const authRoute=require("./routes/auth");
app.use(cors({
  origin: "http://localhost:5173", // Vite default
  credentials: true
}));

connectDb();
app.use("/api/auth",authRoute);
const PORT =process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("server running");
});
