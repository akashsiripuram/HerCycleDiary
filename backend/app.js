require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const router = require("./routes/user.route");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");
const app = express();

app.use(express.json())

app.use("/api",router);


app.get("/",verifyToken,(req,res)=>{
  res.send("Hello World")
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(5000, () => {
  console.log("listening to a port of 5000");
});