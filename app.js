import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js"
import userroutes from "./routes/userroutes.js"

const app = express()
const port = process.env.PORT || "3000";
const DATABASE_URI = process.env.DATABASE_URI 

//---------cors policy-----------
app.use(cors()); 


//DATABASE CONNECTION
connectDB(DATABASE_URI)

//json
app.use(express.json())

//load routes
app.use("/api/user",userroutes)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});
