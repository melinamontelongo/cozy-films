import { useRef, useState } from "react";

import { useForm } from "react-hook-form";

import axios from "axios";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

import { usernameValidation, passwordValidation } from "../utils/validationUtils";

import { AUTH_ENDPOINT } from "../api/endpoints";

import InputGroup from "../components/InputGroup";
import Form from "../components/Form";
import Toast from "../components/Toast";

//  Sign in and sign up
const Auth = () => {
    return (
        <div className="mt-32">
            <div className="grid md:grid-cols-2 place-items-center">
                <div className="bg-neutral/20 backdrop-blur-xl shadow-xl p-10 w-5/6 my-5">
                    <Login />
                </div>
                <div className="bg-neutral/20 backdrop-blur-xl p-10 w-5/6 my-5">
                    <Register />
                </div>
            </div>
        </div>
    )
};
/* Login and Register are separate as they have a different logic */

const Login = () => {
    //  To show alert
    const toastContainer = useRef(null);
    const [isError, setIsError] = useState("");
    const [message, setMessage] = useState("");
    //  Form 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmitLogin = async (values) => {
        try {
            const response = await axios.post(`${AUTH_ENDPOINT}/login`, { ...values });
            //  Store credentials
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            window.localStorage.setItem("username", response.data.username);
            setIsError(false);
            setMessage(response.data.message);
            //  Redirect to home
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
        catch (err) {
            setIsError(true);
            setMessage(err.response.data.message);
        }
        finally {
            //  Show alert and hide it
            toastContainer?.current?.classList.remove("opacity-0");
            setTimeout(() => {
                toastContainer?.current?.classList.add("opacity-0");
            }, 1200);
        }
    };
    return (<>
        <div className="opacity-0" ref={toastContainer}>
            <Toast isError={isError} text={message} />
        </div>
        <Form onSubmit={handleSubmit(onSubmitLogin)} title="Sign In" btnText="Sign In">
            <div className="text-center font-['Roboto'] text-sm font-black">If you already have an account</div>
            <div className="my-5">
                <InputGroup register={register} name="username" validation={usernameValidation} error={errors["username"]} type="text" labelText="Username" />
            </div>
            <div className="my-5">
                <InputGroup register={register} name="password" validation={passwordValidation} error={errors["password"]} type="password" labelText="Password" />
            </div>
        </Form>

    </>
    );
};
const Register = () => {
    //  To show alert
    const toastContainer = useRef(null);
    const [isError, setIsError] = useState("");
    const [message, setMessage] = useState("");
    //  Form
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitRegister = async (values) => {
        try {
            const response = await axios.post(`${AUTH_ENDPOINT}/register`, { ...values });
            setIsError(false);
            setMessage(response.data.message);
        } catch (err) {
            setIsError(true);
            setMessage(err.response.data.message);
        }
        //  Show and hide alert
        finally {
            toastContainer?.current?.classList.remove("opacity-0");
            setTimeout(() => {
                toastContainer?.current?.classList.add("opacity-0");
            }, 1200);
        }
    }
    return (<>
        <div className="opacity-0" ref={toastContainer}>
            <Toast isError={isError} text={message} />
        </div>
        <Form onSubmit={handleSubmit(onSubmitRegister)} title="Sign Up" btnText="Sign up">
            <div className="text-center font-['Roboto'] text-sm font-black">If this is your first time around here</div>
            <div className="my-5">
                <InputGroup register={register} name="username" validation={usernameValidation} error={errors["username"]} type="text" labelText="Username" />
            </div>
            <div className="my-5">
                <InputGroup register={register} name="password" validation={passwordValidation} error={errors["password"]} type="password" labelText="Password" />
            </div>
        </Form>
    </>
    );
};

export default Auth;