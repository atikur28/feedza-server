import { Request, Response } from "express";
import { cartService } from "./cart.service";

const createCartItem = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const item = await cartService.createCartItem(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: "Cart item added successfully",
      data: item,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to add cart item",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const getAllCartItems = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const items = await cartService.getAllCartItems(req.user.id);
    res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: items,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch cart items",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const getCartItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const item = await cartService.getCartItemById(id as string, req.user.id);
    if (!item)
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
        data: null,
        error: "Not found",
      });

    res.status(200).json({
      success: true,
      message: "Cart item fetched successfully",
      data: item,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch cart item",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const updateCartItem = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const { id } = req.params;
    const updated = await cartService.updateCartItem(
      id as string,
      req.body,
      req.user.id,
    );
    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: updated,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to update cart item",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const deleteCartItem = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const { id } = req.params;
    await cartService.deleteCartItem(id as string, req.user.id);
    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
      data: null,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to delete cart item",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

export const cartController = {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
