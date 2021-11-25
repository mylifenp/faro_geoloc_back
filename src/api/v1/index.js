import express from "express";
import { locationStore } from "../../datastore";

const router = express.Router();

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
    { ...req.body },
    { returnUpdatedDocs: true }
  );
  return res.send(location);
});

export default router;
