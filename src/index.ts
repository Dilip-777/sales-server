import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import validateRoutes from "../routes/validate";
import cors from "cors";
import {
  authRouter,
  itemsRouter,
  unitRouter,
  customerRouter,
  zoneRouter,
  categoryRouter,
  orderRouter,
  userRouter,
} from "../routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Hello World" });
  } catch (error) {
    console.log("error", error);
  }
});

app.use("/auth", authRouter);
app.use("/item", itemsRouter);
app.use("/unit", unitRouter);
app.use("/customer", customerRouter);
app.use("/zone", zoneRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);

app.use(async (req: Request, res: Response, next: express.NextFunction) => {
  const error = createError(404, "not found");
  next(error);
});

app.use(
  (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  }
);

prisma
  .$connect()
  .then(() => {
    console.log("[server]: Connected to database");
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("[server]: Failed to connect to the database", error);
  });
