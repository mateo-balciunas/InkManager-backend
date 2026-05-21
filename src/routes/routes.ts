import { Router } from "express";
import routerAppointment from "./appointmen.routes.js";
import routerArtist from "./artist.routes.js";
import routerClient from "./client.routes.js";
import routerCompany from "./company.routes.js";
import routerPortfolio from "./portfolio.routes.js";
import routerPortfolioItem from "./portfolioItem.routes.js";
import routerStockItem from "./stockItem.routes.js";
import routerUser from "./user.routes.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import routerAuth from "./auth.routes.js";

const rootRouter = Router();

rootRouter.use("/appointments", authenticate, authorize(["ARTIST", "ADMIN"]) ,routerAppointment);
rootRouter.use("/artists", routerArtist);
rootRouter.use("/clients", authenticate, authorize(["ADMIN", "ARTIST"]),routerClient);
rootRouter.use("/companies", routerCompany);
rootRouter.use("/portfolios", routerPortfolio);
rootRouter.use("/items", authenticate, authorize(["ARTIST", "ADMIN"]),routerPortfolioItem);
rootRouter.use("/stock", authenticate, authorize(["ARTIST", "ADMIN"]) ,routerStockItem);
rootRouter.use("/users", authenticate, authorize(["ADMIN", "ARTIST", "CLIENT"]) ,routerUser);
rootRouter.use("/auth", routerAuth)
export default rootRouter;