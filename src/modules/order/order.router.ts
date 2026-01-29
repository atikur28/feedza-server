import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);

router.get(
  "/",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
  orderController.getAllOrders,
);

router.get(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
  orderController.getOrderById,
);

router.patch(
  "/:id/status",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  orderController.updateOrderStatus,
);

router.delete("/:id", auth(UserRole.ADMIN), orderController.deleteOrder);

export const orderRouter = router;
