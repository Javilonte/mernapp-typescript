import { useForm } from "react-hook-form";
import { User } from "../../models/user"
import { LoginCredentials } from "../../network/notes_api";
import * as NotesApi from "../../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./inputField";
import styleUtils from "../../styles/utils.module.css";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,

}

const LoginModal = ({onDismiss, onLoginSuccessful}: LoginModalProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                Login to your account
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField 
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Enter username"
                    register={register}
                    registerOptions={{required: "Username is required"}}
                    error={errors.username}
                />
                <TextInputField 
                    name="password"
                    label="Password"
                    type="paswword"
                    placeholder="Enter password"
                    register={register}
                    registerOptions={{required: "Password is required"}}
                    error={errors.password}
                />
                <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className={styleUtils.width100}
                >
                    Log in
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}
export default LoginModal