import express, { NextFunction } from "express";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import type { Request, Response } from "express";
import { handlerReadiness } from "./api/readiness.js";
import { handlerMetrics, handlerReset} from "./api/metrics.js";
import { middlewareIncreaseCounter, middlewareLogResponses, errorMiddleWare} from "./api/middleware.js";
import { handlerValidateChirp } from "./api/chirps.js";
import './config.js'
import { config } from "./config.js";
import { nextTick } from "process";


/*function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`This Error ${err.message} happened`);
  res.status(500).json({
    error: "Something went wrong on our end",
  });
}*/

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

const app = express();
const port = 8080;

app.use("/app", middlewareIncreaseCounter, express.static("./src/app"));
app.use(middlewareLogResponses);
app.use(express.json);

app.get("/admin/metrics", (req, res, next) => {
  Promise.resolve(handlerMetrics(req, res)).catch(next);
});
app.post("/admin/reset", (req, res, next) => {
  Promise.resolve(handlerReset(req, res)).catch(next);
});

app.post("/api/validate_chirp", (req, res, next) => {
  Promise.resolve(handlerValidateChirp(req, res)).catch(next);
});
app.get("/api/healthz", (req, res, next) => {
  Promise.resolve(handlerReadiness(req, res)).catch(next);
});

app.use(errorMiddleWare);

app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});


