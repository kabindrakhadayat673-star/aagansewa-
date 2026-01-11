import express from "express";
import { addManager, deleteManager, getManager, login, logout, updateManager } from "../controllers/auth.controller.js";
import { isLogin } from "../middlewares/islogin.js";
import { authorizeRoles } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/auth-login", login);
router.post("/auth-logout", logout);

// manager
router.post("/add-manager", upload.single("image"), isLogin, authorizeRoles("admin"), addManager);
router.get("/get-managers", isLogin, authorizeRoles("admin"), getManager);
router.put("/edit-manager/:id", upload.single("image"), isLogin, authorizeRoles("admin"), updateManager);
router.delete("/delete-manager/:id", isLogin, authorizeRoles("admin"), deleteManager);


export default router;
