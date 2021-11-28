const { app } = require("../app");

import request from "supertest";
import db, { sequelize } from "../models";

describe("Will test the authentication router", () => {
  const base = "/api/v1/";
  const auth = `${base}auth/`;
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("tries creating a user without email", async () => {
    const res = await request(app).post(`${auth}register/`).send({
      email: "test-test",
      password: "12345678",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual('"email" must be a valid email');
  });
  it("tries creating a new user with short password", async () => {
    const res = await request(app).post(`${auth}register/`).send({
      email: "test1@test.de",
      password: "1234",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(
      '"password" length must be at least 6 characters long'
    );
  });
  it("creates a new account", async () => {
    const res = await request(app).post(`${auth}register/`).send({
      email: "test1@test.de",
      password: "123456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body.status).toEqual("success");
  });
  it("tries creating a new account with the same email address", async () => {
    const res = await request(app).post(`${auth}register/`).send({
      email: "test1@test.de",
      password: "1234567",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("email already used");
  });
  it("tries logging in with wrong account credentials, wrong email", async () => {
    const res = await request(app).post(`${auth}login/`).send({
      email: "w_test1@test.de",
      password: "1234567",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("email is not correct");
  });
  it("tries logging in with wrong account credentials, wrong password", async () => {
    const res = await request(app).post(`${auth}login/`).send({
      email: "test1@test.de",
      password: "1234567",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("invalid password");
  });
  it("tries to login succesfully", async () => {
    const res = await request(app).post(`${auth}login/`).send({
      email: "test1@test.de",
      password: "123456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.header).toHaveProperty("token");
  });
});
