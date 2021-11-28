import { Router } from "express";
import authRouters from "./routes/auth";
import locationRouters from "./routes/location";
import uploadRouters from "./routes/upload";
import authMiddleware from "./utilities/authMiddleware";

const router = Router();

router.use("/auth", authRouters);
router.use("/locations", locationRouters);
router.use("/upload", uploadRouters);
// this should give the list of all available routes
router.get("/", authMiddleware, async (req, res) =>
  res.json({ message: "v1" })
);

export default router;
