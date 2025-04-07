import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { validate } from "../middleware/validation.middleware.js";

const router = Router();
const authController = new AuthController();

// Register
router.post('/register', async (req, res) => {
    await authController.registerUser(req, res);
});

// Login
router.post('/login', async (req, res) => {
    await authController.login(req, res);
});

export default router;
