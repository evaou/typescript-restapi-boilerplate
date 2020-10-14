import { ItemController } from "../controllers/itemController";

export class ItemRoute {
  public itemController: ItemController = new ItemController();

  public routes(app: any): void {
    app.route("/").get(this.itemController.getDefault);
  }
}
