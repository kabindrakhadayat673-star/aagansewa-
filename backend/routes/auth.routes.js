import express from "express";
import { addManager, getManager, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/auth-login", login);
router.post("/auth-logout", logout);

// manager
router.post("/add-manager", addManager);
router.get("/get-manager", getManager);


export default router;
