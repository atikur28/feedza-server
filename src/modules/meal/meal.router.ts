import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { mealController } from "./meal.controller";

const router = express.Router();

router.get("/", mealController.getAllMeals);

router.get("/:id", mealController.getMealById);

router.post("/", auth(UserRole.PROVIDER), mealController.createMeal);

router.put("/:id", auth(UserRole.PROVIDER), mealController.updateMeal);

router.delete(
  "/:id",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  mealController.deleteMeal,
);

export const mealRouter = router;
