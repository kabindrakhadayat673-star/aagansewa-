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
const branchrouter = express.Router();
// provience
branchrouter.post("/add-provience", addProvience);
branchrouter.get("/get-provience", getAllProvience);
branchrouter.delete("/delete-provience/:id", deleteProvience);

// district
branchrouter.post("/add-district", addDistrict);
branchrouter.get("/get-district", getDistrict);
branchrouter.delete("/delete-district/:id", deleteDistrict);

// BRANCH
branchrouter.post("/add-branch", addBranch);
branchrouter.get("/get-branch", getBranch);
branchrouter.delete("/delete-branch/:id", deleteBranch);



export default branchrouter;
