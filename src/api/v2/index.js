import express from "express";
import { v4 as uuidv4 } from "uuid";
import { locationStore, userStore } from "../../datastore";

const router = express.Router();

// const users = [
//   { username: "demo1", password: "demo1" },
//   { username: "demo2", password: "demo2" },
// ];

router.get("/locations", async (req, res) => {
  return res.send(await locationStore.find({}));
});

router.get("/location/:id", async (req, res) =>
  res.send(await locationStore.findOne({ id: req.params.id }))
);

router.post("/location", async (req, res) => {
  const id = uuidv4();
  const { latitude, longitude, name, imageUrl } = req.body;
  const location = await locationStore.insert({
    id,
    latitude,
    longitude,
    name,
    imageUrl,
  });
  return res.send(location);
});

router.put("/location/:id", async (req, res) => {
  const location = await locationStore.update(
    { id: req.params.id },
    { ...req.body, id: req.params.id },
    { returnUpdatedDocs: true }
  );
  return res.send(location);
});

router.delete("/location/:id", async (req, res) => {
  const _deleted = await locationStore.remove({ id: req.params.id });
  console.log("deleted", _deleted);
  res.sendStatus(200);
});

router.get("/users", async (req, res) => res.send(await userStore.find({})));

export default router;
