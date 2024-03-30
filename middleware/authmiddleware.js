import jwt from "jsonwebtoken";
import usermodel from "../models/usearmodels.js";

var checkUserAuth = async (res, req,next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("bearer")) {
    try {
        //get token from header
      token = authorization.split("")[1];

      //verify token
      const { userId } = jwt.verify(token, process.env.JWT_SECRECT_KEY);

      // get user from token
      req.user = await usermodel.findById(userId).select("-password")
      next()

    } catch (error) {
        console(error)
        res.status(401).send({ "status": "failed", "message":"unauthorized user"
    })
  }
}
if(!token){
    res.status(401).send({ "status": "failed", "message":"unauthorized user,no token"})
}
}

export default checkUserAuth
