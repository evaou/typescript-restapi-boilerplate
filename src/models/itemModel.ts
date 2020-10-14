import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ItemSchema = new Schema({
  title: {
    type: String,
    required: "book name",
  },
  author: {
    type: String,
    required: "author name",
  },
  isbn: {
    type: String,
    required: "isbn",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
