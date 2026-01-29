import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const review = await reviewService.createReview(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to create review",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch reviews",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        success: false,
        message: "Review id is required",
        data: null,
        error: "Missing id",
      });

    const review = await reviewService.getReviewById(id as string);
    if (!review)
      return res.status(404).json({
        success: false,
        message: "Review not found",
        data: null,
        error: "Review not found",
      });

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: review,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch review",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const { id } = req.params;
    const updated = await reviewService.updateReview(
      id as string,
      req.body,
      req.user.id,
    );
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updated,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to update review",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: "User not authenticated",
      });

    const { id } = req.params;
    await reviewService.deleteReview(id as string, req.user.id);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: null,
      error: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to delete review",
      data: null,
      error: err.message || "Unknown error",
    });
  }
};

export const reviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
