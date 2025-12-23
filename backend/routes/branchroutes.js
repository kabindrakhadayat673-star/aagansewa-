import express from "express";
import {
  
  addBranch,
  addDistrict,
  addProvience,
  deleteBranch,
  deleteDistrict,
  deleteProvience,
  getAllProvience,
   getBranch,
  getDistrict,
  
} from "../controllers/branch.controller.js";
import { isLogin } from "../middlewares/islogin.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const branchrouter = express.Router();
// provience
branchrouter.post("/add-provience", isLogin, addProvience);
branchrouter.get("/get-provience", getAllProvience);
branchrouter.delete("/delete-provience/:id", isLogin, deleteProvience);

// district
branchrouter.post("/add-district", isLogin,authorizeRoles("admin"),addDistrict);
branchrouter.get("/get-district", getDistrict);
branchrouter.delete("/delete-district/:id", isLogin, deleteDistrict);

// BRANCH
branchrouter.post("/add-branch", isLogin, addBranch);
branchrouter.get("/get-branch", getBranch);
branchrouter.delete("/delete-branch/:id", isLogin, deleteBranch);



export default branchrouter;
