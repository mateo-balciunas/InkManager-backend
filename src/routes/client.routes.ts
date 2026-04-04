import { Router } from "express";
import { ClientController } from "../controllers/client.controller.js";

const routerClient = Router();
const clientController = new ClientController();

routerClient.post("/", clientController.createClient);
routerClient.get("/", clientController.getAllClients);
routerClient.get("/:id", clientController.getClientById);
routerClient.get("/user/:id", clientController.getClientByUserId);
routerClient.put("/:id", clientController.updateClient);
routerClient.delete("/:id", clientController.deleteClient);

export default routerClient;