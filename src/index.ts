import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import validateRoutes from "../routes/validate";
import cors from "cors";
import { authRouter, itemsRouter, unitRouter, companyRouter } from "../routes";
import zoneRouter from "../routes/zone";
import categoryRouter from "../routes/category";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    console.table(users);
  } catch (error) {
    console.log("error", error);
  }
});

app.get(
  "/example",
  async (req: Request, res: Response, next: express.NextFunction) => {
    try {
      throw createError(400, "resource not found");
    } catch (err) {
      next(err);
    }
  }
);

app.use("/auth", authRouter);
app.use("/item", itemsRouter);
app.use("/unit", unitRouter);
app.use("/company", companyRouter);
app.use("/zone", zoneRouter);
app.use("/category", categoryRouter);

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
