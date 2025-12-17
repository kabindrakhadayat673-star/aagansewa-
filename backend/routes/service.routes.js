import express from "express";
import { addservice, deleteservice, getservice, updateService,  } from "../controllers/service.controller.js";

// add service
const serviceRouter = express.Router();
serviceRouter.post("/add-service", addservice);
serviceRouter.get("/get-service", getservice);
serviceRouter.delete("/delete-service/:id", deleteservice)
serviceRouter.patch("/update-service/:id", updateService);

export default serviceRouter;
