import { NextFunction, Request, Response } from "express";
import { mealService } from "./meal.service";

const createMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }

    const result = await mealService.createMeal(req.body, req.user.id);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await mealService.getAllMeals(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getMealById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Meal id is required",
      });
    }

    const result = await mealService.getMealById(id as string);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const { id } = req.params;

    const result = await mealService.updateMeal(
      id as string,
      req.body,
      user.id,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const { id } = req.params;

    await mealService.deleteMeal(id as string, user.id as string);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const mealController = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
