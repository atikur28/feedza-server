import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { categoryController } from "./category.controller";

const router = express.Router();

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoryById);

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.PROVIDER),
  categoryController.createCategory,
);

router.put("/:id", auth(UserRole.ADMIN), categoryController.updateCategory);

router.delete("/:id", auth(UserRole.ADMIN), categoryController.deleteCategory);

export const categoryRouter = router;
