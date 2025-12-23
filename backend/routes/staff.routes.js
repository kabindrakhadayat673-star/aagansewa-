import express from "express";
import { addstaff, deletestaff, getstaff, updateStaff } from "../controllers/staff.controller.js";
import { isLogin } from "../middlewares/islogin.js";

const staffrouter = express.Router();
// staff add
staffrouter.post("/add-staff",isLogin, addstaff);
staffrouter.get("/get-staff", getstaff);
staffrouter.delete("/delete-staff/:id", deletestaff)
staffrouter.patch("/update-staff/:id",updateStaff)

export default staffrouter;
