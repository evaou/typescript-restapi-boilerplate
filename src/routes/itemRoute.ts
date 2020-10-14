import { ItemController } from "../controllers/itemController";

export class ItemRoute {
  public itemController: ItemController = new ItemController();

  public routes(app: any): void {
    app.route("/").get(this.itemController.getDefault);

    app
      .route("/items")
      .get(this.itemController.getItemByProp, this.itemController.getItems)
      .post(this.itemController.addItem);

    app
      .route("/items/:itemId")
      .get(this.itemController.getItem)
      .put(this.itemController.updateItem)
      .delete(this.itemController.deleteItem);

    app
      .route("/items")
      .get(this.itemController.getItemByProp, this.itemController.getItems);
  }
}
