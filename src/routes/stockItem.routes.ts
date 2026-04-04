import { Router } from "express";
import { StockItemsController } from "../controllers/stockItems.controller.js";


const routerStockItem = Router();
const stockItemController = new StockItemsController();

routerStockItem.post("/", stockItemController.createItem);
routerStockItem.get("/", stockItemController.getAll);
routerStockItem.get("/:id", stockItemController.getItemById);
routerStockItem.get("/artist/:id", stockItemController.getByArtistId);
routerStockItem.put("/:id", stockItemController.updateItem);
routerStockItem.delete("/:id", stockItemController.deleteItem);

export default routerStockItem;