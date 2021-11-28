import { Router } from "express";
import authRouters from "./routes/auth";
import locationRouters from "./routes/location";
import uploadRouters from "./routes/upload";
import authMiddleware from "./utilities/authMiddleware";

const router = Router();

router.use("/auth", authRouters);
router.use("/location", locationRouters);
router.use("/upload", uploadRouters);
router.get("/", authMiddleware, async (req, res) =>
  res.json({ message: "v1" })
);

export default router;
