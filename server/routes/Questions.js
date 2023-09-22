import express from "express";

import {
    AskQuestion,
    getPopularQuestions,
    getAllQuestions,
    deleteQuestion,
    voteQuestion,
} from "../controllers/Questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/Ask", auth, AskQuestion);
router.get("/get", getAllQuestions);
router.get("/get", getPopularQuestions);
router.delete("/delete/:id", auth, deleteQuestion);
router.patch("/vote/:id", auth, voteQuestion);

export default router;
