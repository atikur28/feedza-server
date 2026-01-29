import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const order = await orderService.createOrder(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to create order",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders(req.user);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch orders",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        success: false,
        message: "Order id is required",
        data: null,
        error: "Missing id",
      });

    const order = await orderService.getOrderById(id as string, req.user);
    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found",
        data: null,
        error: "Order not found",
      });

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch order",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(
      id as string,
      status,
      req.user,
    );
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to update order status",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const { id } = req.params;
    await orderService.deleteOrder(id as string, req.user);
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: null,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to delete order",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
