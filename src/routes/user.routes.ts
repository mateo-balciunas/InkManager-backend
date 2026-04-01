import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

//USERS CRUD
router.get("/users", userController.getAll);
router.get("/users:id", userController.getOne);
router.delete("/deleteUser:id", userController.deleteUser);

export default router.use("/users", router);