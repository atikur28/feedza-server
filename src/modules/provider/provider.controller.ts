import { Request, Response } from "express";
import { providerService } from "./provider.service";

const getAllProviders = async (_req: Request, res: Response) => {
  try {
    const providers = await providerService.getAllProviders();

    res.status(200).json({
      success: true,
      message: "Providers fetched successfully!",
      data: providers,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers!",
      data: null,
      error: (err as Error).message,
    });
  }
};

const getProviderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const provider = await providerService.getProviderById(id as string);

    res.status(200).json({
      success: true,
      message: "Provider fetched successfully!",
      data: provider,
      error: null,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      data: null,
      error: err.message,
    });
  }
};

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const profile = await providerService.createProviderProfile(
      req.user!.id as string,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Provider profile created successfully!",
      data: profile,
      error: null,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      data: null,
      error: err.message,
    });
  }
};

const updateProviderProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedProfile = await providerService.updateProviderProfile(
      id as string,
      req.user!.id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Provider profile updated successfully!",
      data: updatedProfile,
      error: null,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      data: null,
      error: err.message,
    });
  }
};

const deleteProviderProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await providerService.deleteProviderProfile(
      id as string,
      req.user!.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Provider profile deleted successfully!",
      data: null,
      error: null,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      data: null,
      error: err.message,
    });
  }
};

export const providerController = {
  getAllProviders,
  getProviderById,
  createProviderProfile,
  updateProviderProfile,
  deleteProviderProfile,
};
