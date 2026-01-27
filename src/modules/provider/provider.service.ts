import { prisma } from "../../lib/prisma";

const createProviderProfile = async (
  payload: {
    restaurantName: string;
    address: string;
    phone: string;
    logo?: string;
  },
  userId: string,
) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("Provider profile already exists!");
  }

  if (!payload.restaurantName || !payload.address || !payload.phone) {
    throw new Error("Required fields are missing!");
  }

  const providerProfile = await prisma.providerProfile.create({
    data: {
      restaurantName: payload.restaurantName,
      address: payload.address,
      phone: payload.phone,
      userId,
      ...(payload.logo ? { logo: payload.logo } : {}),
    },
  });

  return providerProfile;
};

export const providerService = {
  createProviderProfile,
};
