import express from "express";
import {
  addProvience,
  deleteProvience,
  getAllProvience,
} from "../controllers/branch.controller.js";
const branchrouter = express.Router();

branchrouter.post("/add-provience", addProvience);
branchrouter.get("/get-provience", getAllProvience);
branchrouter.delete("/delete-provience/:id", deleteProvience);

export default branchrouter;
