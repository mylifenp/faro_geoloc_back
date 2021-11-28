import { Router } from "express";
import authRouters from "./routes/auth";
import locationRouters from "./routes/location";
import uploadRouters from "./routes/upload";

const router = Router();

router.use("/auth", authRouters);
router.use("/location", locationRouters);
router.use("/upload", uploadRouters);

export default router;
