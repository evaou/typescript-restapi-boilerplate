import { expect } from "chai";
import { agent as request } from "supertest";
import { describe, it } from "mocha";
import app from "./../src/app";

let defaultMsg: string = "Get request successfully!!!";
let deleteMsg: string = "Successfully deleted item!";

let title: string = "Effective TypeScript";
let newTitle: string = "New Effective TypeScript";
let author: string = "Dan Vanderkam";
let isbn: string = "978-149205374";
let id: string;

describe("API Tests", () => {
  it("get default", async function () {
    const res = await request(app).get("/");

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(defaultMsg);
  });

  it("add a item", async function () {
    const res = await request(app).post("/items").send({
      title: title,
      author: author,
      isbn: isbn,
    });

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body._id).not.to.be.empty;
    expect(res.body.created_date).not.to.be.empty;
    expect(res.body.title).to.equal(title);
    expect(res.body.author).to.equal(author);
    expect(res.body.isbn).to.equal(isbn);

    id = res.body._id;
  });

  it("get a item", async function () {
    const res = await request(app).get(`/items/${id}`);

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body._id).to.equal(id);
    expect(res.body.title).to.equal(title);
    expect(res.body.author).to.equal(author);
    expect(res.body.isbn).to.equal(isbn);
  });

  it("get all items", async function () {
    const res = await request(app).get("/items");

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an.instanceof(Array);
  });

  it("update a item", async function () {
    const res = await request(app)
      .put(`/items/${id}`)
      .send({ title: newTitle });

    expect(res.status).to.equal(200);
    expect(res.body._id).to.equal(id);
    expect(res.body.title).to.equal(newTitle);
  });

  it("delete a item", async function () {
    const res = await request(app).delete(`/items/${id}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(deleteMsg);
  });
});
