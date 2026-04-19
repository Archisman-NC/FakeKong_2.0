import { Router } from "express";
import { pool } from "../infrastructure/database"
import { ApiController } from "../controllers/ApiController";
import { ApiRepository } from "../repositories/ApiRepository";
import { ApiService } from "../services/ApiService";
import { ROLES } from "../utils/permissions";

import {authMiddleware} from '../middleware/authMiddleware';
import { organizationMiddleware } from "../middleware/organizationMiddleware";
import { requiredRoles } from "../utils/permissions";

const router = Router();

const apiRepository = new ApiRepository(pool);
const apiService = new ApiService(apiRepository);
const apiController = new ApiController(apiService);

router.post('/',
    authMiddleware,
    organizationMiddleware,
    requiredRoles([ROLES.OWNER, ROLES.ADMIN]),
    apiController.createApi
);

router.get('/',
    authMiddleware,
    organizationMiddleware,
    apiController.getApis
);

router.get('/:id',
    authMiddleware,
    organizationMiddleware,
    apiController.getApiById
);

router.put('/:id',
    authMiddleware,
    organizationMiddleware,
    requiredRoles([ROLES.OWNER, ROLES.ADMIN]),
    apiController.updateApi
);

router.delete('/:id',
    authMiddleware,
    organizationMiddleware,
    requiredRoles([ROLES.OWNER, ROLES.ADMIN]),
    apiController.deleteApi
);

export default router;


