const { app } = require("../app");

import request from "supertest";
import db, { sequelize } from "../models";

describe("Tests the location routes", () => {
  const base_url = "/api/v1/";
  const register_url = `${base_url}auth/register/`;
  const login_url = `${base_url}auth/login/`;
  const location_url = `${base_url}locations/`;
  const credentials = {
    email: "test1@test.de",
    password: "123456",
  };

  const location1 = {
    name: "Stuttgart",
    imageurl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Stuttgart_Downtown_Sights_Collage.png",
    latitude: 48.775845,
    longitude: 9.182932,
  };
  const location2 = {
    name: "Karlsruhe",
    imageurl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Schloss_Karlsruhe_2011.jpg",
    latitude: 49.006889,
    longitude: 8.403653,
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
  it("tires to get a list of locations", async () => {
    const res = await request(app)
      .get(location_url)
      .set({ token, Accept: "application/json" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });
  it("tires to add location", async () => {
    const res = await request(app)
      .post(location_url)
      .send(location1)
      .set({ token, Accept: "application/json" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toEqual(location1.name);
  });
  it("tries to update location", async () => {
    const res = await request(app)
      .put(`${location_url}/1`)
      .send({ ...location1, name: "Stuttgart1" })
      .set({ token, Accept: "application/json" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toEqual("Stuttgart1");
  });
  it("tries to get the list of all added locations", async () => {
    await request(app)
      .post(location_url)
      .send(location2)
      .set({ token, Accept: "application/json" });
    const res = await request(app)
      .get(location_url)
      .set({ token, Accept: "application/json" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });
  it("tries deleting a location", async () => {
    const res = await request(app)
      .delete(`${location_url}/1`)
      .send({ ...location1, name: "Stuttgart1" })
      .set({ token, Accept: "application/json" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("success");
  });
  it("tries to get the list of all added locations after delete", async () => {
    const res = await request(app)
      .get(location_url)
      .set({ token, Accept: "application/json" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });
});
