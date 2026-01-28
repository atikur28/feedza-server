import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { data, error } = await userService.getAllUsers();
    if (error) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: null,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Users fetched successfully!",
      data,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching users!",
      data: null,
      error: err?.message || "Internal Server Error!",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await userService.getUserById(id as string);
    if (error) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: null,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "User fetched successfully!",
      data,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user!",
      data: null,
      error: err?.message || "Internal Server Error!",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await userService.updateUser(
      id as string,
      req.body,
    );
    if (error) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: null,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "User updated successfully!",
      data,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating user!",
      data: null,
      error: err?.message || "Internal Server Error!",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await userService.deleteUser(id as string);
    if (error) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: null,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully!",
      data: null,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting user!",
      data: null,
      error: err?.message || "Internal Server Error!",
    });
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
