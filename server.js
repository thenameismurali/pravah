require("dotenv").config();
const express = require("express");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const app = express(); 
const cors = require("cors");


const connectDb = require("./config/dbconfig");
const authRoute=require("./routes/auth");
const adminRoute =require("./routes/admin");
const eventRoute = require("./routes/event");
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      // allow all Netlify domains
      if (origin.endsWith(".netlify.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
