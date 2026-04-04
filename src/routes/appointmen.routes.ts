import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller.js";

const routerAppointment = Router();
const appointmentController = new AppointmentController();

//Appointments CRUD
routerAppointment.post("/", appointmentController.createAppointment);
routerAppointment.get("/", appointmentController.getAll);
routerAppointment.get("/:id", appointmentController.getOne);
routerAppointment.get("/artist/:artistId", appointmentController.getByArtist);
routerAppointment.get("/company/:companyId", appointmentController.getByCompany);
routerAppointment.put("/:id", appointmentController.updateAppointment);
routerAppointment.delete("/:id", appointmentController.deleteAppointment);

export default routerAppointment;