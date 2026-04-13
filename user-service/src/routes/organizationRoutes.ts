import {Router} from 'express';
import { OrganizationController } from '../controllers/OrganizationController.js';
import { OrganizationService } from '../services/OrganizationService.js';
import { pool } from '../infrastructure/database.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

const orgService = new OrganizationService(pool);
const orgController = new OrganizationController(orgService);

router.post(
    '/',
    authMiddleware,
    orgController.createOrganization.bind(orgController)
)
router.get(
    '/',
    authMiddleware,
    orgController.getOrganization.bind(orgController)
);

export default router;