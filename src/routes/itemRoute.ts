import { Request, Response } from "express";

export class ItemRoute {
  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "Get request successfully!!!",
      });
    });
  }
}
