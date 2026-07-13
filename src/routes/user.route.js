import express from "express";
import UserController from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/users",
    protect,
    UserController.getUsers
);

router.get(
    "/users/:id",
    protect,
    UserController.getUserById
);

export default router;