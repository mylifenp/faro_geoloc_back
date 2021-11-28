const { app } = require("../app");

import request from "supertest";
import db, { sequelize } from "../models";

describe("Tests the location routes", () => {
  const base_url = "/api/v1/";
  const register_url = `${base_url}auth/register/`;
  const login_url = `${base_url}auth/login/`;
  const location_url = `${base_url}location/`;
  const credentials = {
    email: "test1@test.de",
    password: "123456",
  };
  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await request(app).post(register_url).send(credentials);
    const res = await request(app).post(login_url).send(credentials);
    token = res.body.token;
  });

  it("test v1 is reachable", async () => {
    const res = await request(app)
      .get(base_url)
      .set({ token, Accept: "application/json" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
