import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const routerAuth = Router();
const authController = new AuthController();

routerAuth.post("/login", authController.login);
routerAuth.post("/register", authController.register);
routerAuth.post("/logout", authController.logout);

export default routerAuth;