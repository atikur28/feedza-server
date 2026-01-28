import { prisma } from "../../lib/prisma";

interface ServiceResponse<T> {
  data: T | null;
  error: { message: string; statusCode: number } | null;
}

const getAllUsers = async (): Promise<ServiceResponse<any[]>> => {
  try {
    const users = await prisma.user.findMany();
    return { data: users, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Failed to fetch users", statusCode: 500 },
    };
  }
};

const getUserById = async (id: string): Promise<ServiceResponse<any>> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return {
        data: null,
        error: { message: "User not found", statusCode: 404 },
      };
    }
    return { data: user, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Failed to fetch user", statusCode: 500 },
    };
  }
};

const updateUser = async (
  id: string,
  payload: Partial<{
    name: string;
    email: string;
    role: string;
    status: string;
    image: string;
  }>,
): Promise<ServiceResponse<any>> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return {
        data: null,
        error: { message: "User not found", statusCode: 404 },
      };

    const updatedUser = await prisma.user.update({
      where: { id },
      data: payload,
    });

    return { data: updatedUser, error: null };
  } catch (err: any) {
    if (err.code === "P2002") {
      return {
        data: null,
        error: { message: "Email already exists", statusCode: 409 },
      };
    }
    return {
      data: null,
      error: { message: "Failed to update user", statusCode: 500 },
    };
  }
};

const deleteUser = async (id: string): Promise<ServiceResponse<null>> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return {
        data: null,
        error: { message: "User not found", statusCode: 404 },
      };

    await prisma.user.delete({ where: { id } });
    return { data: null, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Failed to delete user", statusCode: 500 },
    };
  }
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
