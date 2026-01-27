import { prisma } from "../../lib/prisma";

const createMeal = async (payload: any, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });
  if (!provider) throw new Error("Provider profile not found");

  return prisma.meal.create({
    data: {
      ...payload,
      providerId: provider.id,
    },
  });
};

const getAllMeals = async (query: any) => {
  return prisma.meal.findMany({
    include: { provider: true, category: true },
  });
};

const getMealById = async (id: string) => {
  return prisma.meal.findUnique({
    where: { id },
    include: { provider: true, reviews: true },
  });
};

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
