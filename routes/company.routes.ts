import express from "express";
import multer from "multer";

import { FuzzySearchCompanies, GetCompanies, GetPaginatedCompanies } from "../controllers/company.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

export const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 * 50 } })

const router = express.Router()

router.route("/companies").get(isAuthenticatedUser, GetCompanies)
router.route("/search/companies").get(isAuthenticatedUser, FuzzySearchCompanies)
router.route("/companies/paginated").get(isAuthenticatedUser, GetPaginatedCompanies)


export default router;