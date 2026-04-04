import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const routerUser = Router();
const userController = new UserController();

//USERS CRUD
routerUser.post("/", userController.createUser);
routerUser.get("/", userController.getAll);
routerUser.get("/:id", userController.getOne);
routerUser.put("/:id", userController.updateUser);
routerUser.delete("/:id", userController.deleteUser);

export default routerUser;