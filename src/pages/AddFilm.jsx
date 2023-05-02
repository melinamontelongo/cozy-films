import { useRef } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

import { useGetUserID } from "../hooks/useGetUser";

import { filmValidation } from "../utils/validationUtils";

import { FILMS_ENDPOINT } from "../api/endpoints";

import InputGroup from "../components/InputGroup";
import Form from "../components/Form";
import Textarea from "../components/Textarea";
import Toast from "../components/Toast";


const AddFilm = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    //  Get token
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();
    //  To show an alert when film is submitted
    const [isError, setIsError] = useState("");
    const [message, setMessage] = useState("");
    const toastContainer = useRef(null);

    const onSubmit = async (values) => {
        //  User not logged in
        if (!userID) {
            alert("You must be logged in to do that!");
            return;
        }
        //  User is logged in
        try {
            await axios.post(FILMS_ENDPOINT, { ...values, likes: 0, dislikes: 0, userOwner: userID }, { headers: { authorization: cookies.access_token } });
            setIsError(false);
            setMessage("Film successfully added!")
            navigate("/");
        } catch (err) {
            setIsError(true);
            setMessage("Unexpected error");
        } finally {
            //  Show alert and hide it
            toastContainer?.current?.classList.remove("opacity-0");
            setTimeout(() => {
                toastContainer?.current?.classList.add("opacity-0");
            }, 1200);
        }
    };
    return (
        <div className="container mx-auto mt-32 mb-10">
            <div className="opacity-0" ref={toastContainer}>
                <Toast isError={isError} text={message} />
            </div>
            <div className="grid place-items-center ">
                {!userID ? <div className="font-['Roboto'] font-bold text-4xl">You must <Link to="/auth" className="text-primary underline">sign in</Link> to add a film to our database</div>
                    :
                    <Form title="Add a new film to our database" btnText="Add film" onSubmit={handleSubmit(onSubmit)} >
                        <div className="grid md:grid-cols-2 place-items-center my-10 gap-10">
                            <div className="grid gap-5 ">
                                <InputGroup register={register} name="title" validation={filmValidation.title} error={errors["title"]} type="text" labelText="Title" />
                                <InputGroup register={register} name="year" validation={filmValidation.year} error={errors["year"]} type="text" labelText="Year" />
                                <InputGroup register={register} name="genres" validation={filmValidation.genres} error={errors["genres"]} type="text" labelText="Genres" />
                            </div>
                            <div className="grid gap-5 ">
                                <InputGroup register={register} name="image" validation={filmValidation.image} error={errors["image"]} type="text" labelText="Image URL" />
                                <Textarea register={register} name="description" validation={filmValidation.description} error={errors["description"]} label="Description" />
                            </div>
                        </div>
                    </Form>
                }
            </div>
        </div>
    )
}

export default AddFilm;