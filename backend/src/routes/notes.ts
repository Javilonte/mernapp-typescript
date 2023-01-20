import express from 'express';
import {getNotes, createNote, getNote}  from '../controllers/notes';

const router = express.Router();

router.get('/', getNotes);

router.get('/:noteId', getNote);

router.post('/', createNote);
  
export default router;