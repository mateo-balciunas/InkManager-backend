import { Router } from "express";
import routerAppointment from "./appointmen.routes.js";
import routerArtist from "./artist.routes.js";
import routerClient from "./client.routes.js";
import routerCompany from "./company.routes.js";
import routerPortfolio from "./portfolio.routes.js";
import routerPortfolioItem from "./portfolioItem.routes.js";
import routerStockItem from "./stockItem.routes.js";
import routerUser from "./user.routes.js";

const rootRouter = Router();

rootRouter.use("/appointments", routerAppointment);
rootRouter.use("/artists", routerArtist);
rootRouter.use("/clients", routerClient);
rootRouter.use("/companies", routerCompany);
rootRouter.use("/portfolios", routerPortfolio);
rootRouter.use("/items", routerPortfolioItem);
rootRouter.use("/stock", routerStockItem);
rootRouter.use("/users", routerUser);

export default rootRouter;