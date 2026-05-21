import { Router } from "express";
import { PortfolioController } from "../controllers/portfolio.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const routerPortfolio = Router();
const portfolioController = new PortfolioController();

routerPortfolio.post("/", authenticate, authorize(["ADMIN", "ARTIST"]) ,portfolioController.createPortfolio);
routerPortfolio.get("/", portfolioController.getAll);
routerPortfolio.get("/:id", portfolioController.getById);
routerPortfolio.get("/artist/:id", portfolioController.getByArtistId);
routerPortfolio.put("/:id", authenticate, authorize(["ADMIN", "ARTIST"]) ,portfolioController.updatePortfolio);
routerPortfolio.delete("/:id", authenticate, authorize(["ADMIN", "ARTIST"]) ,portfolioController.deletePortfolio);

export default routerPortfolio;