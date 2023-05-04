import { useLayoutEffect, useState, useRef } from "react";

import axios from "axios";

import { useForm } from "react-hook-form";
import { filmValidation } from "../utils/validationUtils";

import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";

import { FILMS_ENDPOINT } from "../api/endpoints";

import { useGetUserID } from "../hooks/useGetUser";
import { useGetFilms } from "../hooks/useGetFilms";


import { AiFillLike, AiFillDislike } from "react-icons/ai";

import CardImg from "../components/CardImg";
import Toast from "../components/Toast";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

//  Where all films present on database (DB) are displayed
const Catalog = () => {
    //  Loading status and all films in DB
    const { loading, films, likedFilms, dislikedFilms, setFilms, fetchLikedFilms, fetchDislikedFilms, fetchAllFilms } = useGetFilms();
    //  To show alert
    const toastContainer = useRef(null);
    const [isError, setIsError] = useState("");
    const [message, setMessage] = useState("");
    //  Get credentials
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();
    //  Form handling for search
    const { register, formState: { errors }, handleSubmit } = useForm();

    const showAlert = (isError, msg) => {
        setIsError(isError);
        setMessage(msg);
        toastContainer?.current?.classList.remove("opacity-0");
        setTimeout(() => {
            toastContainer?.current?.classList.add("opacity-0");
        }, 1200);
    };

    const likeFilm = async (filmID, userID) => {
        const likeElem = document.getElementById(`like${filmID}`);
        if (!userID) {
            return showAlert(true, "You must be logged in to do that!");
        };
        try {
            likeElem.parentElement.style.cursor = "wait";
            const response = await axios.put(FILMS_ENDPOINT, { filmID, userID }, { headers: { authorization: cookies.access_token } });
            //  Update UI
            if (response.status === 200) {
                fetchDislikedFilms();
                fetchLikedFilms();
                likeElem.innerText = +likeElem.innerText + 1;
                if (dislikedFilms?.includes(filmID)) {
                    const dislikeElem = document.getElementById(`dislike${filmID}`);
                    if (+dislikeElem.innerText > 0) dislikeElem.innerText = +dislikeElem.innerText - 1;
                }
            }
        } catch (err) {
            showAlert(true, "You've already liked this film");
        } finally{
            likeElem.parentElement.style.cursor = "auto";
        }
    };

    const dislikeFilm = async (filmID, userID) => {
        const dislikeElem = document.getElementById(`dislike${filmID}`);
        if (!userID) {
            return showAlert(true, "You must be logged in to do that!");
        };
        try {
            dislikeElem.parentElement.style.cursor = "wait";
            const response = await axios.put(`${FILMS_ENDPOINT}/dislike`, { filmID, userID }, { headers: { authorization: cookies.access_token } });
            //  Update UI
            if (response.status === 200) {
                fetchLikedFilms();
                fetchDislikedFilms();
                dislikeElem.innerText = +dislikeElem.innerText + 1;
                if (likedFilms?.includes(filmID)) {
                    const likedElem = document.getElementById(`like${filmID}`);
                    if (+likedElem.innerText > 0) likedElem.innerText = +likedElem.innerText - 1;
                }
            }
        } catch (err) {
            showAlert(true, "You've already disliked this film");
        }
        finally{
            dislikeElem.parentElement.style.cursor = "auto";
        }
    };

    const handleSearch = async (value) => {
        const response = await axios.get(`${FILMS_ENDPOINT}/title/${value.search}`);
        setFilms(response.data);
    };

    return (
        <div className="container mx-auto mt-32">
            <div className="opacity-0" ref={toastContainer}>
                <Toast isError={isError} text={message} />
            </div>
            {loading ? <Loader /> :
                <>
                    <div className="flex justify-center md:w-1/2 mx-auto">
                        <SearchBar onSubmit={handleSubmit(handleSearch)} register={register} name="search" validation={filmValidation.search} error={errors["search"]} placeholder="Search..." />
                    </div>
                    {films?.length < 1 && <div className="font-['Roboto'] font-bold text-4xl mt-20 text-center">Found no matching results, try again or <button className="text-primary underline" onClick={() => fetchAllFilms()}>go back</button></div>}
                    {films?.map((film) => {
                        return (
                            <CardImg key={film._id}
                                img={film.image}
                                title={film.title}
                                description={film.description}
                                keywords={film.genres}
                                info={film.year}
                                footer={
                                    <div className="flex gap-5">
                                        <button className="flex items-center gap-1 btn btn-sm" onClick={() => likeFilm(film._id, userID)}>
                                            <AiFillLike className={`${likedFilms?.includes(film._id) && "text-primary"}`} />
                                            <span id={`like${film._id}`}>{film.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-1 btn btn-sm" onClick={() => dislikeFilm(film._id, userID)}>
                                            <AiFillDislike className={`${dislikedFilms?.includes(film._id) && "text-primary"}`} />
                                            <span id={`dislike${film._id}`}>{film.dislikes}</span>
                                        </button>
                                        <Link to={`/film-reviews/${film._id}`} className="btn btn-sm btn-secondary font-['Roboto'] font-black text-lg capitalize">Reviews</Link>
                                    </div>
                                }
                            />
                        )
                    })}

                </>
            }

        </div>
    );
};

export default Catalog;