import { useForm } from "react-hook-form";
import { User } from "../../models/user";
import { SignUpCredentials } from "../../network/notes_api";
import * as NotesApi from "../../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./inputField";
import styleUtils from "../styles/utils.module.css";

interface SignUpModalProps {
    onDismiss: () => void;
    onSignUpSuccessful: (user: User) => void;
}



const SingUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps)  => {

    const {register, handleSubmit, formState: { errors, isSubmitting}} = useForm<SignUpCredentials>();
    async function onSubmit(credentials: SignUpCredentials) {
        try{
            const newUser = await NotesApi.signUp(credentials); // You call the signup function which expxects the credentials
            onSignUpSuccessful(newUser);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                Sign Up
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
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter e-mail address"
                    register={register}
                    registerOptions={{required: "E-Mail is required"}}
                    error={errors.email}
                    />
                    <TextInputField
                    name="password"
                    label="Password"
                    type="password"
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
                        Sign Up
                    </Button>

                </Form>
            </Modal.Body>
            </Modal>
    );
}

export default SingUpModal;;