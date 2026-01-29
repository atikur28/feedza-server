import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER),
  userController.updateUser,
);

router.delete("/:id", auth(UserRole.ADMIN), userController.deleteUser);

export const userRouter = router;
