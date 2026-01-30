import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./lib/auth";
import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { cartRouter } from "./modules/cart/cart.router";
import { categoryRouter } from "./modules/category/category.router";
import { mealRouter } from "./modules/meal/meal.router";
import { orderRouter } from "./modules/order/order.router";
import { providerRouter } from "./modules/provider/provider.router";
import { reviewRouter } from "./modules/review/review.router";
import { userRouter } from "./modules/user/user.router";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL || "https://feedza.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/users", userRouter);

app.use("/api/providers", providerRouter);

app.use("/api/categories", categoryRouter);

app.use("/api/meals", mealRouter);

app.use("/api/carts", cartRouter);

app.use("/api/orders", orderRouter);

app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("Feedza server is running....");
});

app.use(notFound);

app.use(errorHandler);

export default app;
