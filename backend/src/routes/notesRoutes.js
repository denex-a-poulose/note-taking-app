import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:_id", getNoteById);
router.post("/", createNote);
router.put("/:_id", updateNote);
router.delete("/:_id", deleteNote);

export default router;
