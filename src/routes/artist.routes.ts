import { Router } from "express";
import { ArtistController } from "../controllers/artist.controller.js";

const routerArtist = Router();
const artistController = new ArtistController();

routerArtist.post("/", artistController.createArtist);
routerArtist.get("/", artistController.getAll);
routerArtist.get("/:id", artistController.getOne);
routerArtist.get("/user/:id", artistController.getByUser);
routerArtist.get("/company/:id", artistController.getByCompany);
routerArtist.put("/:id", artistController.updateArtist);
routerArtist.delete("/:id", artistController.deleteArtist);

export default routerArtist;