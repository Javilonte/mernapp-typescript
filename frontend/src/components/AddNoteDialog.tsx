import { Form, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'

interface AddNoteDialogProps {
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}

export const AddNoteDialog = ({onDismiss, onNoteSaved}: AddNoteDialogProps) => {
  
      const  {register, handleSubmit, formState: {errors, isSubmitting }} = useForm<NoteInput>();

    async function onSubmit(input: NoteInput) {
        try {
            const noteResponse = await NotesApi.createNote(input);
            onNoteSaved(noteResponse);
            onDismiss();
        } catch(error) {
            console.log(error);
            alert(error);
        }
    }
  
      return (


    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" isInvalid={!!errors.title} {...register("title", {required: "Required"})} />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                    {errors.title?.message} // Tells you the error if title is undefined
                </Form.Control.Feedback>
                <Form.Group className="mb-3">
                    
                <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" 
                    rows={5}
                    placeholder="Enter your note" {...register("text")}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button 
            type="submit"
            form="addNoteForm"
            disabled={isSubmitting}
            >
                Save Note
            </Button>
        </Modal.Footer>
    </Modal>
  )
}