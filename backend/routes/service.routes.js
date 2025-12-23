import express from "express";
import { addservice, deleteservice, getservice, updateService,  } from "../controllers/service.controller.js";
import { isLogin } from "../middlewares/islogin.js";

// add service
const serviceRouter = express.Router();
serviceRouter.post("/add-service", isLogin, addservice);
serviceRouter.get("/get-service",isLogin,getservice);
serviceRouter.delete("/delete-service/:id", isLogin, deleteservice)
serviceRouter.patch("/update-service/:id", isLogin, updateService);

export default serviceRouter;
