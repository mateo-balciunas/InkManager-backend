import { Router } from "express";
import { PortfolioController } from "../controllers/portfolio.controller.js";

const routerPortfolio = Router();
const portfolioController = new PortfolioController();

routerPortfolio.post("/", portfolioController.createPortfolio);
routerPortfolio.get("/", portfolioController.getAll);
routerPortfolio.get("/:id", portfolioController.getById);
routerPortfolio.get("/artist/:id", portfolioController.getByArtistId);
routerPortfolio.put("/:id", portfolioController.updatePortfolio);
routerPortfolio.delete("/:id", portfolioController.deletePortfolio);

export default routerPortfolio;