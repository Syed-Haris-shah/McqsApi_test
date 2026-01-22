import express from "express";
import {getMCQs, createMCQ, updateMCQ} from "../controllers/mcqstest.Controller.js";
import validateCategory from "../meddlewares/validatetest.Category.js";


const router = express.Router();

// Public APIs
// /v1/mcqs/general/pak-study
router.get("/:category/:subject", validateCategory, getMCQs);

// Admin APIs (auth middleware later)
router.post("/", createMCQ);
router.patch("/:id", updateMCQ);

export default router;
