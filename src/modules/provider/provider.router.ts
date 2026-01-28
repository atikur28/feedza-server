import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { providerController } from "./provider.controller";

const router = express.Router();

router.get("/", providerController.getAllProviders);

router.get("/:id", providerController.getProviderById);

router.post(
  "/profile",
  auth(UserRole.PROVIDER),
  providerController.createProviderProfile,
);

router.patch(
  "/:id",
  auth(UserRole.PROVIDER),
  providerController.updateProviderProfile,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN),
  providerController.deleteProviderProfile,
);

export const providerRouter = router;
