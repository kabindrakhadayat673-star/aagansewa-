import express from "express";
import {
  addProvience,
  getAllProvience,
} from "../controllers/branch.controller.js";
const branchrouter = express.Router();

branchrouter.post("/add-provience", addProvience);
branchrouter.get("/get-provience", getAllProvience);

export default branchrouter;
