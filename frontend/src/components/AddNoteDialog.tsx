import Modal from 'react-bootstrap/Modal'

interface AddNoteDialogProps {
    onDismiss: () => void,
}

export const AddNoteDialog = ({onDismiss}: AddNoteDialogProps) => {
  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
    </Modal>
  )
}