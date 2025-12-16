import express from "express";
import { addservice, deleteservice, getservice } from "../controllers/service.controler.js";

// add service
const serviceRouter = express.Router();
serviceRouter.post("/add-service", addservice);
serviceRouter.get("/get-service", getservice);
serviceRouter.delete("/delete-service/:id", deleteservice)

export default serviceRouter;
