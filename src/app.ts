import * as express from "express";
import * as bodyParser from "body-parser";
import { ItemRoute } from "./routes/itemRoute";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public route: ItemRoute = new ItemRoute();
  public mongoUrl: string = "mongodb://localhost/ItemDb";

  constructor() {
    this.app = express();
    this.config();
    this.route.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new App().app;
