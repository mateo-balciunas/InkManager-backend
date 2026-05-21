import { Router } from "express";
import { CompanyController } from "../controllers/company.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const routerCompany = Router();
const companyController = new CompanyController();

routerCompany.post("/", authenticate, authorize(["ADMIN", "ARTIST"]) ,companyController.createCompany);
routerCompany.get("/", companyController.getAllCompanies);
routerCompany.get("/:id", companyController.getCompanyById);
routerCompany.put("/:id", authenticate, authorize(["ADMIN", "ARTIST"]) ,companyController.updateCompany);
routerCompany.delete("/:id", authenticate, authorize(["ADMIN", "ARTIST"]) ,companyController.deleteCompany);

export default routerCompany;