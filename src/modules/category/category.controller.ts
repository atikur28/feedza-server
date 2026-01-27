import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.json({
      success: true,
      message: "Categories retrieved successfully!",
      data: categories,
    });
  } catch (err: any) {
    next(err);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category id is required!",
      });
    }

    const category = await categoryService.getCategoryById(id as string);
    res.json({
      success: true,
      message: "Category retrieved successfully!",
      data: category,
    });
  } catch (err: any) {
    next(err);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: category,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const category = await categoryService.updateCategory(id as string, {
      name,
      slug,
    });

    res.json({
      success: true,
      message: "Category updated successfully!",
      data: category,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await categoryService.deleteCategory(id as string);
    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err: any) {
    next(err);
  }
};

export const categoryController = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
