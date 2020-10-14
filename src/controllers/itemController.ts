import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import { ItemSchema } from "../models/itemModel";

const Item = mongoose.model("Item", ItemSchema);

export class ItemController {
  public getDefault(req: Request, res: Response) {
    res.status(200).send({
      message: "Get request successfully!!!",
    });
  }

  public addItem(req: Request, res: Response) {
    let newItem = new Item(req.body);

    newItem.save((err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public getItems(req: Request, res: Response) {
    Item.find({}, (err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public getItemByProp(req: Request, res: Response, next: NextFunction) {
    if (!Object.keys(req.query).length) {
      next();
      return;
    }

    var key: string = Object.keys(req.query)[0];
    var val = req.query[key];
    let obj: Object = {};
    obj[key] = val;

    Item.findOne(obj, (err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public getItem(req: Request, res: Response) {
    Item.findById(req.params.itemId, (err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public updateItem(req: Request, res: Response) {
    Item.findOneAndUpdate(
      { _id: req.params.itemId },
      req.body,
      { new: true, useFindAndModify: false },
      (err, item) => {
        if (err) {
          res.send(err);
        }
        res.json(item);
      }
    );
  }

  public deleteItem(req: Request, res: Response) {
    Item.deleteOne({ _id: req.params.itemId }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted item!" });
    });
  }
}
