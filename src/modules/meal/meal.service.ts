import { prisma } from "../../lib/prisma";

// Create a meal for a provider
const createMeal = async (payload: any, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });
  if (!provider) throw new Error("Provider profile not found");

  return prisma.meal.create({
    data: {
      ...payload,
      providerId: provider.id,
      userId,
    },
  });
};

// Get all meals, optionally filtered by provider (userId)
const getAllMeals = async (userId?: string) => {
  const whereClause = userId ? { userId } : {};

  return prisma.meal.findMany({
    where: whereClause,
    include: {
      provider: true,
      category: true,
      reviews: true,
    },
  });
};

// Get single meal by ID
const getMealById = async (id: string) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      provider: true,
      category: true,
      reviews: true,
    },
  });
};

// Update meal (only by the provider who owns it)
const updateMeal = async (id: string, payload: any, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });
  if (!provider) throw new Error("Provider profile not found");

  const meal = await prisma.meal.findUnique({ where: { id } });
  if (!meal) throw new Error("Meal not found");

  if (meal.providerId !== provider.id) {
    throw new Error("You are not allowed to update this meal");
  }

  return prisma.meal.update({
    where: { id },
    data: payload,
  });
};

// Delete meal (only by the provider who owns it)
const deleteMeal = async (id: string, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });
  if (!provider) throw new Error("Provider profile not found");

  const meal = await prisma.meal.findUnique({ where: { id } });
  if (!meal) throw new Error("Meal not found");

  if (meal.providerId !== provider.id) {
    throw new Error("You are not allowed to delete this meal");
  }

  return prisma.meal.delete({ where: { id } });
};

export const mealService = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
