import { Router } from "express";
import { PortfolioItemController } from "../controllers/portfolioItem.controller.js";

const routerPortfolioItem = Router();
const portfolioItemController = new PortfolioItemController();

routerPortfolioItem.post("/", portfolioItemController.createItem);
routerPortfolioItem.get("/", portfolioItemController.getAllItems);
routerPortfolioItem.get("/:id", portfolioItemController.findItemById);
//routerPortfolioItem.get("/artist/:id", portfolioItemController.findItemByArtist);
routerPortfolioItem.put("/:id", portfolioItemController.updateItem);
routerPortfolioItem.delete("/:id", portfolioItemController.deleteItem);

export default routerPortfolioItem;