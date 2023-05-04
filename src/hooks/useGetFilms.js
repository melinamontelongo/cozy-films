import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUser";
import { FILMS_ENDPOINT } from "../api/endpoints";
import axios from "axios";

export const useGetFilms = () => {
    const [loading, setLoading] = useState(true);
    const [films, setFilms] = useState([]);
    const [likedFilms, setLikedFilms] = useState(null);
    const [dislikedFilms, setDislikedFilms] = useState(null);
    const userID = useGetUserID();

    const fetchAllFilms = async () => {
        try {
            const response = await axios.get(FILMS_ENDPOINT);
            setFilms(response.data);
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }
    const fetchLikedFilms = async () => {
        try {
            const response = await axios.get(`${FILMS_ENDPOINT}/likedFilms/ids/${userID}`);
            setLikedFilms(response.data.likedFilms);
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }
    const fetchDislikedFilms = async () => {
        try {
            const response = await axios.get(`${FILMS_ENDPOINT}/dislikedFilms/ids/${userID}`);
            setDislikedFilms(response.data.dislikedFilms);
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchAllFilms();
        if(userID){
            fetchLikedFilms();
            fetchDislikedFilms();
        }
    }, [])

    return { loading, films, likedFilms, dislikedFilms, fetchLikedFilms, fetchDislikedFilms, fetchAllFilms }
}
