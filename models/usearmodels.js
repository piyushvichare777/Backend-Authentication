import mongoose from "mongoose";

//defining schema
const userschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  tc: {
    type: Boolean,
    require: true,
  },
});

//model
const usermodel = mongoose.model("usear",userschema)

export default usermodel

