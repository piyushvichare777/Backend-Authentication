import express from "express";
const router = express.Router();
import usearcontroller from "../controller/usearcontroller.js";
import checkUserAuth from "../middleware/authmiddleware.js";

// router level midderware - to protect route
router.use("/changepassword", checkUserAuth);

//public route
router.post("/register", usearcontroller.userRegisterion);
router.post("/login", usearcontroller.userlogin);

//protected router
router.post("/change", usearcontroller.changeUserpassword);

export default router