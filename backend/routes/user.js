import { Router } from "express";
import { getProfile, signIn, signUp } from "../controllers/auth.js";
import { registerValidator } from "../middleware/validators.js";
import { validateUser } from "../middleware/validation.js";
import { changeProfileImg } from "../controllers/user.controller.js";

const router = Router();

router.post("/signin", signIn);

router.post("/signup", registerValidator, signUp);

router.post("/profileImg", validateUser, changeProfileImg);

router.get("/profile", validateUser, getProfile);

export default router;
