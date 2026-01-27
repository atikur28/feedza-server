import { NextFunction, Request, Response } from "express";
import { providerService } from "./provider.service";

const createProviderProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }

    if (req.user.role !== "PROVIDER") {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }

    const result = await providerService.createProviderProfile(
      req.body,
      req.user?.id as string,
    );

    res.status(201).json({
      success: true,
      message: "Profile created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const providerController = {
  createProviderProfile,
};
