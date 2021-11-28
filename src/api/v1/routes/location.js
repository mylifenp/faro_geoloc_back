import { Router } from "express";
import authMiddleware from "../utilities/authMiddleware";
import {
  getLocations,
  getLocation,
  addLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/location";

const router = Router();

// these api are only accesible after login, so add a middleware

//use this to get all the locations
router.get("/", authMiddleware, getLocations);

// use this to get the location with id
router.get("/:id", authMiddleware, getLocation);

// use this to add a new location
router.post("/", authMiddleware, addLocation);

// use this to update a location
router.put("/:id", authMiddleware, updateLocation);

// use this to delete a location
router.delete("/:id", authMiddleware, deleteLocation);

export default router;
