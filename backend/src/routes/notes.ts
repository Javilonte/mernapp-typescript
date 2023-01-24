import express from 'express';
import {getNotes, createNote, getNote, updateNote, deleteNote}  from '../controllers/notes';

const router = express.Router();

router.get('/', getNotes);

router.get('/:noteId', getNote);

router.post('/', createNote);

router.patch("/:noteId", updateNote);

router.delete("/:noteId", deleteNote)
  
export default router;