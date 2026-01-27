import { prisma } from "../../lib/prisma";

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    include: { meals: true },
  });

  if (!categories || categories.length === 0) {
    throw new Error("No categories found");
  }

  return categories;
};

const getCategoryById = async (id: string) => {
  if (!id) throw new Error("Category ID is required");

  const category = await prisma.category.findUnique({
    where: { id },
    include: { meals: true },
  });

  if (!category) throw new Error("Category not found");

  return category;
};

const createCategory = async (payload: { name: string; slug: string }) => {
  const { name, slug } = payload;

  if (!name) throw new Error("Category name is required!");

  if (!slug) throw new Error("Category slug is required!");

  const existingName = await prisma.category.findUnique({ where: { name } });

  if (existingName) throw new Error("Category name already exists!");

  const existingSlug = await prisma.category.findUnique({ where: { slug } });

  if (existingSlug) throw new Error("Category slug already exists!");

  const category = await prisma.category.create({
    data: { name, slug },
  });

  return category;
};

const updateCategory = async (
  id: string,
  payload: { name: string; slug: string },
) => {
  const { name, slug } = payload;

  if (!id) throw new Error("Category ID is required");
  if (!name) throw new Error("Category name is required");
  if (!slug) throw new Error("Category slug is required");

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new Error("Category not found");

  const existingName = await prisma.category.findUnique({ where: { name } });
  if (existingName && existingName.id !== id)
    throw new Error("Category name already exists");

  const existingSlug = await prisma.category.findUnique({ where: { slug } });
  if (existingSlug && existingSlug.id !== id)
    throw new Error("Category slug already exists");

  const updated = await prisma.category.update({
    where: { id },
    data: { name, slug },
  });

  return updated;
};

const deleteCategory = async (id: string) => {
  if (!id) throw new Error("Category ID is required!");

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new Error("Category not found!");

  await prisma.category.delete({ where: { id } });

  return true;
};

export const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
