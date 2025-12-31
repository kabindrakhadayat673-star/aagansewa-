import express from "express";
import { addManager, getManager, login, logout, updateManager } from "../controllers/auth.controller.js";
import { isLogin } from "../middlewares/islogin.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/auth-login", login);
router.post("/auth-logout", logout);

// manager
router.post("/add-manager", isLogin, authorizeRoles("admin"), addManager);
router.get("/get-manager", isLogin, authorizeRoles("admin"), getManager);
router.patch("/update-manager/:id", isLogin, authorizeRoles("admin"), updateManager);


export default router;
