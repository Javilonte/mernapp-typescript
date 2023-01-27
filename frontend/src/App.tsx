
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from './styles/NotePage.module.css';
import stylesUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import { AddEditNoteDialog } from './components/AddEditNoteDialog';
import {FaPlus} from 'react-icons/fa';

function App() {

  const[notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  useEffect( () => {
    async function loadNotes() {
      try{
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch(error) {
        console.log(error);
        alert(error);
      }
      
    }
    loadNotes();
  },[]);

  async function deleteNote (note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch(error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button 
      className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}` }
      onClick={()=> setShowAddNoteDialog(true)}>
        <FaPlus />
        Add New Note
      </Button>
      <Row xs={1} md={2} lg={3} className='g-4'>
        
      {notes.map(note => (
        <Col key={note._id}>
        <Note note={note}
          onDeleteNoteClicked={deleteNote}
          onNoteClicked={setNoteToEdit}
          className={styles.note} />
        </Col>
      ))}
      
      </Row>
      {
        showAddNoteDialog && 
        <AddEditNoteDialog 
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={((newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false);

          })}
        />
        }
        {noteToEdit && 
        <AddEditNoteDialog
        noteToEdit={noteToEdit}
        onDismiss={() => setNoteToEdit(null)}
        onNoteSaved={(updatedNote) => {
          setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
          setNoteToEdit(null);
        }}
        />
        }
    </Container>
  );
}

export default App;
