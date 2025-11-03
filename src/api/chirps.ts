import type { Request, Response } from "express";

import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./errors.js";

export async function handlerValidateChirp(req: Request, res: Response) {
  type reqBody = {
    body: string;
  };

  const body:reqBody = req.body;
  const badWords:string[] = ["kerfuffle","sharbert","fornax"]
  const maxChirpLength = 140;

  if (body.body.length > maxChirpLength) {
    throw new BadRequestError(
      `Chirp is too long. Max length is ${maxChirpLength}`,
    );
  }

  const words = body.body.split(" ");

    let splitLowerBody = body.body.toLowerCase().split(" ");
    let splitBody = body.body.split(" ");
    for(let badWord of badWords){
        if(splitLowerBody.includes(badWord)){
        for(let i=0; i<splitLowerBody.length;i++){
            if (splitLowerBody[i] === badWord){
            
            splitBody[i] = "****";
            }
        }
      }
    }

  const cleaned = splitBody.join(" ");

  respondWithJSON(res, 200, {
    cleanedBody: cleaned,
  });
}
