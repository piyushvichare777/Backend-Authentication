

import usearmodel from "../models/usearmodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usermodel from "../models/usearmodels.js";


class usearcontroller {
    //user registerion
  static userRegisterion = async (req, res) => {
    const { name, email, password,password_confemation, tc } = req.body
    const user = await usearmodel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exit" })
    } else {
      if (name && email && password && password_confemation && tc) {
          if (password === password_confemation) {
            try {
                const salt = await bcrypt.genSalt(10); //password salting
                const hashpassword =await bcrypt.hash(password,salt) //hasing 
                const doc = new usearmodel({
                  name: name,
                  email: email,
                  password: hashpassword,
                  tc: tc,
                });
                await doc.save(); 
                const saved_user =await usermodel.findOne({email:email})
                //Genrate JWT Token
                const token = jwt.sign({userID:saved_user._id}, process.env.JWT_SECRECT_KEY,{expiresIn:"5d"})
                 res.status(201).send({ "status":"sucess", "message": " register successfully","Token":token});
            } catch (error) {
                console.log(erro)
                res.send({ "status": "failed", "message": "unable to register" });
            }

        } else {
          res.send({ "status": "failed", "message": "password dosent match" });
        }
      } else {
        res.send({ "status": "failed", "message": "all field are required" });
      }
    }
  };


  //userlogin
  static userlogin =async (req,res)=>{
    try {
        const {email,password} =req.body
        if(email && password){
            const user = await usearmodel.findOne({email:email})
            if(user != null){
                const isMactch = await bcrypt.compare(password,user.password)
                if((user.email === email ) && isMactch ){
                  //Generate JWT Token
                  const token = jwt.sign({userID:user._id}, process.env.JWT_SECRECT_KEY,{expiresIn:"5d"})
                    res.send({ "status": "sucess", "message": "login success","Token":token });

                }else{
                    res.send({ "status": "failed", "message": "email or password is not vaild" });
                }
            }else{
                res.send({ "status": "failed", "message": "you are not register user" });
            }
        }else{
            res.send({ "status": "failed", "message": "all field are required" });
        }
        
    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "unable to login" });
    }
  }

  //change password
  static changeUserpassword =async(req,res)=>{
    const{password,password_confemation}=req.body
    if(password&&password_confemation){
      if(password!==password_confemation){
        res.send({ "status": "failed", "message": "new password and confirm new password doesn" })
      }else{
        const salt = await bcrypt.genSalt(10); //password salting
        const newhashpassword = await bcrypt.hash(password, salt); //hasing
         res.send({ "status": "failed", "message": "password changed succesfully"})
    }
    }else{
      res.send({ "status": "failed", "message": "all field are required" });
        }
    }

  
  }

export default usearcontroller
