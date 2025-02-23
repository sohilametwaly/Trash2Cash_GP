import { Router } from "express";
import { getProfile, signIn, signUp } from "../controllers/auth.js";
import { registerValidator } from "../middleware/validators.js";
import { validateUser } from "../middleware/validation.js";

const router = Router();

router.post("/signin", signIn);

router.post("/signup", registerValidator, signUp);

router.get("/profile", validateUser, getProfile);

export default router;
