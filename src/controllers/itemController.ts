import { Request, Response } from "express";

export class ItemController {
  public getDefault(req: Request, res: Response) {
    res.status(200).send({
      message: "Get request successfully!!!",
    });
  }
}
