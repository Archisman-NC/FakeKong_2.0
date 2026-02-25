import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { UserService } from "../services/UserService.js";
import { UserRepository } from "../repositories/UserRepository.js";

const router = Router();

const repo = new UserRepository();
const service = new UserService(repo);
const controller = new UserController(service);

router.post("/register",controller.register)

export default router;