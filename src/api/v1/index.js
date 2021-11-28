import { Router } from "express";
import authRouters from "./routes/auth";
import locationRouters from "./routes/location";

const router = Router();

router.use("/auth", authRouters);
router.use("/location", locationRouters);

export default router;
