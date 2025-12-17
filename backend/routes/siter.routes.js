import express from "express";
import {
  addInquiry,
  addreview,
  deleteInquiry,
  getInquiry,
  getreview,
} from "../controllers/site.controller.js";
const siterouter = express.Router();


// add inquiry
siterouter.post("/add-inquiry", addInquiry);
siterouter.get("/get-inquiry", getInquiry);
siterouter.delete("/delete-inquiry/:id", deleteInquiry);

// add review
siterouter.post("/add-review", addreview)
siterouter.get("/get-review", getreview)

export default siterouter;
