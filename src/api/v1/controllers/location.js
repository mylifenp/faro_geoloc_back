import models from "../../../models";

export const getLocations = async (req, res) => {
  try {
    const locations = await models.Location.findAll();
    if (!locations.length) {
      return res.status(404).json({ error: "no resources found" });
    }
    return res.send(locations);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getLocation = async (req, res) => {
  try {
    const location = await models.Location.findOne({
      where: { id: req.params.id },
    });
    if (!location) {
      return res.status(404).json({ error: "no resource found" });
    }
    return res.send(location);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addLocation = async (req, res) => {
  try {
    const location = await models.Location.create({ ...req.body });
    if (!location) {
      return res.status(404).json({ error: "unable to add resource" });
    }
    return res.send(location);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const location = await models.Location.findOne({
      where: { id: req.params.id },
    });
    if (!location) {
      return res.status(404).json({ error: "unable to locate resource" });
    }
    await location.update({ ...req.body });
    return res.send(location);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const location = await models.Location.destroy({
      where: { id: req.params.id },
    });
    if (!location) {
      return res.status(404).json({ error: "unable to locate resource" });
    }
    return res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
