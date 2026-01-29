import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), reviewController.createReview);

router.get("/", reviewController.getAllReviews);

router.get("/:id", reviewController.getReviewById);

router.put("/:id", auth(UserRole.CUSTOMER), reviewController.updateReview);

router.delete(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.ADMIN),
  reviewController.deleteReview,
);

export const reviewRouter = router;
