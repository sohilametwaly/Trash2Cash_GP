import { Router } from "express";
import { getProfile, signIn, signUp } from "../controllers/auth.js";
import { registerValidator } from "../middleware/validators.js";
import { validateUser } from "../middleware/validation.js";
import {
  changeProfileImg,
  deleteUser,
  getAppIncome,
  getCompanies,
  getUsers,
  updateBalances,
  getAppExpenses,
  getChartData,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signin", signIn);

router.post("/signup", registerValidator, signUp);

router.post("/profileImg", validateUser, changeProfileImg);

router.get("/profile", validateUser, getProfile);

router.get("/getCompanies", validateUser, getCompanies);

router.get("/getUsers", validateUser, getUsers);

router.get("/appIncome", validateUser, getAppIncome);

router.get("/appExpenses", validateUser, getAppExpenses);

router.get("/chartData", validateUser, getChartData);

router.post("/updateBalances", validateUser, updateBalances);

router.delete("/delete/:userId", validateUser, deleteUser);

export default router;
