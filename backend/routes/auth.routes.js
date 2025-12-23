import express from "express";
import { addManager, getManager, login, logout, updateManager } from "../controllers/auth.controller.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/auth-login", login);
router.post("/auth-logout", logout);

// manager
router.post("/add-manager", addManager);
router.get("/get-manager", getManager);
router.patch("/update-manager/:id", updateManager);


export default router;
