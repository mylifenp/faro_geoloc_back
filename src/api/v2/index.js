import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => res.json({ message: "version2" }));

export default router;
