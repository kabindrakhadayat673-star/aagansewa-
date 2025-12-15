import express from "express";
import {
  addDistrict,
  addProvience,
  deleteDistrict,
  deleteProvience,
  getAllProvience,
  getDistrict,
} from "../controllers/branch.controller.js";
const branchrouter = express.Router();

branchrouter.post("/add-provience", addProvience);
branchrouter.get("/get-provience", getAllProvience);
branchrouter.delete("/delete-provience/:id", deleteProvience);

// district
branchrouter.post("/add-district", addDistrict);
branchrouter.get("/get-district", getDistrict);
branchrouter.delete("/delete-district/:id", deleteDistrict);



export default branchrouter;
