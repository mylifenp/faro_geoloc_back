import { Router } from "express";
import authMiddleware from "../utilities/authMiddleware";

const router = Router();

// these api are only accesible after login, so add a middleware

//use this to get all the locations
router.get("/", authMiddleware);

// use this to get the location with id
router.get("/:id", authMiddleware);

// use this to add a new location
router.post("/", authMiddleware);

// use this to update a location
router.put("/:id", authMiddleware);

// use this to delete a location
router.delete("/:id", authMiddleware);

export default router;
