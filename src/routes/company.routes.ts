import { Router } from "express";
import { CompanyController } from "../controllers/company.controller.js";

const routerCompany = Router();
const companyController = new CompanyController();

routerCompany.post("/", companyController.createCompany);
routerCompany.get("/", companyController.getAllCompanies);
routerCompany.get("/:id", companyController.getCompanyById);
routerCompany.put("/:id", companyController.updateCompany);
routerCompany.delete("/:id", companyController.deleteCompany);

export default routerCompany;