import express from "express";
import trimRequest from "trim-request";
import {
  auth,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/auth").post(trimRequest.all, auth);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshtoken").post(trimRequest.all, refreshToken);

export default router;
