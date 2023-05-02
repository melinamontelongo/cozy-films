import { useEffect, useState, useRef } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { FILMS_ENDPOINT } from "../api/endpoints";

import { useGetUserID } from "../hooks/useGetUser";
import { useGetFilms } from "../hooks/useGetFilms";

import { useCookies } from "react-cookie";

import { AiFillLike, AiFillDislike } from "react-icons/ai";

import CardImg from "../components/CardImg";
import Toast from "../components/Toast";
import Loader from "../components/Loader";

//  Where all films present on database (DB) are displayed
const Catalog = () => {
    //  Loading status and all films in DB
    const { loading, films } = useGetFilms();
    //  To show alert
    const toastContainer = useRef(null);
    const [isError, setIsError] = useState("");
    const [message, setMessage] = useState("");
    //  To show user's liked and disliked films right away
    const [likedFilms, setLikedFilms] = useState(null);
    const [dislikedFilms, setDislikedFilms] = useState(null);
    //  Get credentials
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();

    const showAlert = (isError, msg) => {
        setIsError(isError);
        setMessage(msg);
        toastContainer?.current?.classList.remove("opacity-0");
        setTimeout(() => {
            toastContainer?.current?.classList.add("opacity-0");
        }, 1200);
    }

    const fetchLikedFilms = async () => {
        try {
            const response = await axios.get(`${FILMS_ENDPOINT}/likedFilms/ids/${userID}`);
            setLikedFilms(response.data.likedFilms);
        } catch (err) {
            console.error(err);
        }
    }
    const fetchDislikedFilms = async () => {
        try {
            const response = await axios.get(`${FILMS_ENDPOINT}/dislikedFilms/ids/${userID}`);
            setDislikedFilms(response.data.dislikedFilms);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchLikedFilms();
        fetchDislikedFilms();
    }, []);

    const likeFilm = async (filmID, userID) => {
        if (!userID) {
            return showAlert(true, "You must be logged in to do that!");
        };
        try {
            const response = await axios.put(FILMS_ENDPOINT, { filmID, userID }, { headers: { authorization: cookies.access_token } });
            //  Update UI
            if (response.status === 200) {
                fetchDislikedFilms();
                fetchLikedFilms();
                const likeElem = document.getElementById(`like${filmID}`);
                likeElem.innerText = +likeElem.innerText + 1;
                if (dislikedFilms?.includes(filmID)) {
                    const dislikeElem = document.getElementById(`dislike${filmID}`);
                    if (+dislikeElem.innerText > 0) dislikeElem.innerText = +dislikeElem.innerText - 1;
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
    const dislikeFilm = async (filmID, userID) => {
        if (!userID) {
            return showAlert(true, "You must be logged in to do that!");
        };
        try {
            const response = await axios.put(`${FILMS_ENDPOINT}/dislike`, { filmID, userID }, { headers: { authorization: cookies.access_token } });
            //  Update UI
            if (response.status === 200) {
                fetchLikedFilms();
                fetchDislikedFilms();
                const dislikeElem = document.getElementById(`dislike${filmID}`);
                dislikeElem.innerText = +dislikeElem.innerText + 1;
                if (likedFilms?.includes(filmID)) {
                    const likedElem = document.getElementById(`like${filmID}`);
                    if (+likedElem.innerText > 0) likedElem.innerText = +likedElem.innerText - 1;
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="container mx-auto mt-32">
            <div className="opacity-0" ref={toastContainer}>
                <Toast isError={isError} text={message} />
            </div>
            {loading && <Loader />}
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

        </div>
    );
};

export default Catalog;