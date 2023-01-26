
import logo from './logo.svg';

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';

function App() {

  const[notes, setNotes] = useState<NoteModel[]>([]);

  useEffect( () => {
    async function loadNotes() {
      try{
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        const notes = await response.json();
        setNotes(notes);
      } catch(error) {
        console.log(error);
        alert(error);
      }
      
    }
    loadNotes();
  },[]);


  return (
    <div>
      {notes.map(note => (
        <Note note={note} key={note._id}/>
      ))}
    </div>
  );
}

export default App;
