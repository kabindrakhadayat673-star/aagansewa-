import express from "express";
import {
  addInquiry,
  addreview,
  addTrustedCostumer,
  deleteInquiry,
  deleteTrustedCustomer,
  getInquiry,
  getreview,
  getTrustedCustomers,
} from "../controllers/site.controller.js";
import { uploadTrusted } from "../utlis/multerhandler.js";

const siterouter = express.Router();


// add inquiry
siterouter.post("/add-inquiry", addInquiry);
siterouter.get("/get-inquiry", getInquiry);
siterouter.delete("/delete-inquiry/:id", deleteInquiry);

// add review
siterouter.post("/add-review", addreview)
siterouter.get("/get-review", getreview)

// trust customer
siterouter.post("/add-trust-customer",uploadTrusted.single("image"), addTrustedCostumer)
siterouter.get("/get-trust-customer", getTrustedCustomers)
siterouter.delete("/delete-trust-customer/:id", deleteTrustedCustomer)

export default siterouter;
