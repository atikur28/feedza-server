import { Request, Response } from "express";
import { categoryService } from "./category.service";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.json({
      success: true,
      data: categories,
      error: null,
      message: "Categories retrieved successfully!",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      data: null,
      error: err.message || "Something went wrong",
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Category ID is required!",
      });
    }

    const category = await categoryService.getCategoryById(id as string);
    return res.json({
      success: true,
      data: category,
      error: null,
      message: "Category retrieved successfully!",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      data: null,
      error: err.message || "Something went wrong",
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json({
      success: true,
      data: category,
      error: null,
      message: "Category created successfully!",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      data: null,
      error: err.message || "Something went wrong",
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    if (!id || !name || !slug) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Category ID, name and slug are required!",
      });
    }

    const category = await categoryService.updateCategory(id as string, {
      name,
      slug,
    });
    return res.json({
      success: true,
      data: category,
      error: null,
      message: "Category updated successfully!",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      data: null,
      error: err.message || "Something went wrong",
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Category ID is required!",
      });
    }

    await categoryService.deleteCategory(id as string);
    return res.json({
      success: true,
      data: null,
      error: null,
      message: "Category deleted successfully!",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      data: null,
      error: err.message || "Something went wrong",
    });
  }
};

export const categoryController = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
