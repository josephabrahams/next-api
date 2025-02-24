import { Router } from "express";
import nocache from "nocache";

import logger from "./logger.js";

const router = Router();

router.use(logger());
router.use(nocache());

router.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

router.use((req, res, next) => {
  res.status(404).json({
    error: 404,
    message: "Not Found",
  });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 500,
    message: "Internal Server Error",
  });
});

export default router;
