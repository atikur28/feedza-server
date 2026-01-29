import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createOrder = async (payload: any, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id: payload.providerId },
  });
  if (!provider) throw new Error("Provider not found");

  const order = await prisma.order.create({
    data: {
      customerId: userId,
      providerId: payload.providerId,
      address: payload.address,
      totalAmount: payload.totalAmount,
      items: { create: payload.items },
    },
    include: { items: true },
  });

  return order;
};

const getAllOrders = async (user: any) => {
  const where: any = {};
  if (user.role === "CUSTOMER") where.customerId = user.id;
  if (user.role === "PROVIDER") where.providerId = user.providerId;

  return prisma.order.findMany({
    where,
    include: { items: { include: { meal: true } } },
  });
};

const getOrderById = async (id: string, user: any) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { meal: true } } },
  });
  if (!order) return null;

  if (user.role === "CUSTOMER" && order.customerId !== user.id)
    throw new Error("Not authorized");
  if (user.role === "PROVIDER" && order.providerId !== user.providerId)
    throw new Error("Not authorized");

  return order;
};

const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
  user: any,
) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) throw new Error("Order not found");

  if (user.role === "PROVIDER" && order.providerId !== user.providerId)
    throw new Error("Not authorized");

  return prisma.order.update({
    where: { id },
    data: { status },
  });
};

const deleteOrder = async (id: string, user: any) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) throw new Error("Order not found");

  if (user.role === "CUSTOMER" && order.customerId !== user.id)
    throw new Error("Not authorized");

  return prisma.order.delete({ where: { id } });
};

export const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
