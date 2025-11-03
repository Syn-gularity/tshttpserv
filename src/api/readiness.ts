import type { Request, Response } from "express";

export async function handlerReadiness(_req: Request, res: Response) {
  res.set("Content-Type","text/plain; charset=utf-8")
  res.status(200);
  res.send("OK");
}