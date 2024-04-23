import express from "express";
import trimRequest from "trim-request";
import { searchUsers, allUsers } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(trimRequest.all, authMiddleware, searchUsers);
router.route("/all").get(trimRequest.all, allUsers);
export default router;
