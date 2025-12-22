require("dotenv").config();
const express = require("express");
const app = express(); 
const cors = require("cors");
app.use(express.json());

const connectDb = require("./config/dbconfig");
const authRoute=require("./routes/auth");
const adminRoute =require("./routes/admin");
const eventRoute = require("./routes/event");
app.use(
  cors({
    origin: [
      "https://taupe-banoffee-9b6829.netlify.app",
      "https://strong-praline-19bdfb.netlify.app",
      "https://elegant-belekoy-b190c7.netlify.app"
    ],
    credentials: true,
  })
);

connectDb();
app.use("/api/auth",authRoute);
app.use("/api/admin",adminRoute);
app.use("/api/events",eventRoute);
const PORT =process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("server running");
});
