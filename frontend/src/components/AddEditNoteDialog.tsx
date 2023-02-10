import { Form, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import TextInputField from './form/inputField'

interface AddNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}

export const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",

        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse);
            onDismiss();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (


        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>{noteToEdit ? "Edit note " : "Add note"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Enter title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        placeholder="Enter text"
                        rows={5}
                        register={register}

                    />
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                >
                    Save Note
                </Button>
            </Modal.Footer>
        </Modal>
    )
}