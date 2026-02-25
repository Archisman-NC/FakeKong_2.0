import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { UserService } from "../services/UserService.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

const repo = new UserRepository();
const service = new UserService(repo);
const controller = new UserController(service);

router.post("/register",controller.register)
router.post("/login",controller.login)
router.get("/me",authMiddleware,controller.me)

export default router;