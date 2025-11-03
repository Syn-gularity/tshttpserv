import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerMetrics(_req: Request, res: Response) {
  res.set("Content-Type","text/html; charset=utf-8")
  res.status(200);
  //res.send(`Hits: ${config.fileserverHits}`);
  res.send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.api.fileserverHits} times!</p>
  </body>
</html>`)
}

export async function handlerReset(_req: Request, res: Response) {
  res.set("Content-Type","text/plain; charset=utf-8")
  res.status(200);
  config.api.fileserverHits = 0;
  res.send(`Counter Reset!`);
}

