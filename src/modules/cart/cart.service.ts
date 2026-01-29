import { prisma } from "../../lib/prisma";

const createCartItem = async (payload: any, userId: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id: payload.mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  const existing = await prisma.cartItem.findFirst({
    where: {
      userId,
      mealId: payload.mealId,
    },
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + (payload.quantity || 1),
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      userId,
      mealId: meal.id,
      quantity: payload.quantity || 1,
      mealName: meal.name,
      mealPrice: meal.price,
      mealImage: meal.image,
    },
  });
};

const getAllCartItems = async (userId: string) => {
  return prisma.cartItem.findMany({ where: { userId } });
};

const getCartItemById = async (id: string, userId: string) => {
  return prisma.cartItem.findFirst({ where: { id, userId } });
};

const updateCartItem = async (id: string, payload: any, userId: string) => {
  const item = await prisma.cartItem.findUnique({ where: { id } });
  if (!item) throw new Error("Cart item not found");
  if (item.userId !== userId) throw new Error("Not authorized");

  return prisma.cartItem.update({
    where: { id },
    data: {
      quantity: payload.quantity,
    },
  });
};
const deleteCartItem = async (id: string, userId: string) => {
  const item = await prisma.cartItem.findUnique({ where: { id } });
  if (!item) throw new Error("Cart item not found");
  if (item.userId !== userId) throw new Error("Not authorized");

  return prisma.cartItem.delete({ where: { id } });
};

export const cartService = {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
