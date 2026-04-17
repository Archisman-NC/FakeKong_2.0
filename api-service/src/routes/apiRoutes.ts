import { Router } from "express";
import { Pool } from "pg";
import { ApiContoller } from "../controllers/ApiController";
import { ApiRepository } from "../repositories/ApiRepository";
import { ApiService } from "../services/ApiService";

// import {AuthMiddleware}

const router = Router();

