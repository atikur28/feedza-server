import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { cartController } from "./cart.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), cartController.createCartItem);

router.get("/", auth(UserRole.CUSTOMER), cartController.getAllCartItems);

router.get("/:id", auth(UserRole.CUSTOMER), cartController.getCartItemById);

router.put("/:id", auth(UserRole.CUSTOMER), cartController.updateCartItem);

router.delete("/:id", auth(UserRole.CUSTOMER), cartController.deleteCartItem);

export const cartRouter = router;
