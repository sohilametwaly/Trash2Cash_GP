import { Router } from "express";
import { getProfile, signIn, signUp } from "../controllers/auth.js";
import { registerValidator } from "../middleware/validators.js";
import { validateUser } from "../middleware/validation.js";
import {
  changeProfileImg,
  getCompanies,
  getUsers,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signin", signIn);

router.post("/signup", registerValidator, signUp);

router.post("/profileImg", validateUser, changeProfileImg);

router.get("/profile", validateUser, getProfile);

router.get("/getCompanies", validateUser, getCompanies);

router.get("/getUsers", validateUser, getUsers);

export default router;
