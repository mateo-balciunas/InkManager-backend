import { Router } from "express";
import { ClientController } from "../controllers/client.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const routerClient = Router();
const clientController = new ClientController();

routerClient.post("/", authenticate, authorize(["ADMIN", "ARTIST"]),clientController.createClient);
routerClient.get("/", clientController.getAllClients);
routerClient.get("/:id", clientController.getClientById);
routerClient.get("/user/:id", clientController.getClientByUserId);
routerClient.put("/:id", authenticate, authorize(["ADMIN", "ARTIST"]), clientController.updateClient);
routerClient.delete("/:id", authenticate, authorize(["ADMIN", "ARTIST"]), clientController.deleteClient);

export default routerClient;