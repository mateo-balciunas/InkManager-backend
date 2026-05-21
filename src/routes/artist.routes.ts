import { Router } from "express";
import { ArtistController } from "../controllers/artist.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const routerArtist = Router();
const artistController = new ArtistController();

routerArtist.post("/", authenticate, authorize(["ADMIN", "ARTIST"]) ,artistController.createArtist);
routerArtist.get("/", artistController.getAll);
routerArtist.get("/:id", artistController.getOne);
routerArtist.get("/user/:id", artistController.getByUser);
routerArtist.get("/company/:id", artistController.getByCompany);
routerArtist.put("/:id", authenticate, authorize(["ADMIN", "ARTIST"]) ,artistController.updateArtist);
routerArtist.delete("/:id", authenticate, authorize(["ADMIN", "ARTIST"]) ,artistController.deleteArtist);

export default routerArtist;