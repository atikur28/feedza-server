import { prisma } from "../../lib/prisma";

const getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    include: {
      meals: true,
      orders: true,
    },
  });
};

const getProviderById = async (id: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id },
    include: { meals: true },
  });

  if (!provider) {
    const error = new Error("Provider not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return provider;
};

const createProviderProfile = async (
  userId: string,
  payload: {
    restaurantName: string;
    address: string;
    phone: string;
    logo?: string;
  },
) => {
  const exists = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (exists) {
    const error = new Error("Provider profile already exists");
    (error as any).statusCode = 409;
    throw error;
  }

  return prisma.providerProfile.create({
    data: {
      ...payload,
      userId,
    },
  });
};

const updateProviderProfile = async (
  providerId: string,
  userId: string,
  payload: {
    restaurantName?: string;
    address?: string;
    phone?: string;
    logo?: string;
  },
) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id: providerId },
  });

  if (!provider) {
    const error = new Error("Provider profile not found");
    (error as any).statusCode = 404;
    throw error;
  }

  if (provider.userId !== userId) {
    const error = new Error("You are not allowed to update this profile");
    (error as any).statusCode = 403;
    throw error;
  }

  return prisma.providerProfile.update({
    where: { id: providerId },
    data: payload,
  });
};

const deleteProviderProfile = async (providerId: string, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id: providerId },
  });

  if (!provider) {
    const error = new Error("Provider profile not found");
    (error as any).statusCode = 404;
    throw error;
  }

  if (provider.userId !== userId) {
    const error = new Error("You are not allowed to delete this profile");
    (error as any).statusCode = 403;
    throw error;
  }

  await prisma.providerProfile.delete({
    where: { id: providerId },
  });
};

export const providerService = {
  getAllProviders,
  getProviderById,
  createProviderProfile,
  updateProviderProfile,
  deleteProviderProfile,
};
