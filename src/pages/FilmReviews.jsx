import { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import { useForm } from "react-hook-form";

import axios from 'axios';

import { useCookies } from "react-cookie";

import { useGetUserID } from "../hooks/useGetUser";

import { filmValidation } from '../utils/validationUtils';

import { IoMdArrowBack } from "react-icons/io";

import { FILMS_ENDPOINT } from '../api/endpoints';

import Form from '../components/Form';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Rating from '../components/Rating';
import CardTxt from '../components/CardTxt';
import Modal from '../components/Modal';
import CircleBtn from '../components/CircleBtn';
import Loader from '../components/Loader';

//  Where film's reviews are displayed
const FilmReviews = () => {
    //  Get credentials
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    //  Get film's ID from URL parameter
    let { filmID } = useParams();
    //  Film review state
    const [film, setFilm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    //  Form
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        setLoading(true);
        const fetchFilm = async () => {
            try {
                const response = await axios.get(`${FILMS_ENDPOINT}/${filmID}`);
                setFilm(response.data);
                //  User already reviewed this film (will not be prompted to review it)
                if (response.data.reviews.filter(review => review.user._id === userID).length > 0) setAlreadyReviewed(true);
            } catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchFilm();
    }, []);

    const onSubmit = async (reviewValues) => {
        if (alreadyReviewed) {
            alert("You've already commented on this film!");
            return;
        }
        try {
            const response = await axios.post(`${FILMS_ENDPOINT}/review`, { filmID, userID, review: reviewValues }, { headers: { authorization: cookies.access_token } });
            setAlreadyReviewed(true);
            window.location.reload(true);
        } catch (err) {
            console.error(err)
        }
    };
    return (
        <div className="container mt-32 mx-auto">
            {loading ? <Loader /> : <>
                <div className="sm:absolute mb-5">
                    <CircleBtn content={<Link to="/catalog"><IoMdArrowBack className="text-2xl" /></Link>} />
                </div>
                <div className="mb-10 text-center">
                    <h1 className="text-4xl text-primary font-['Roboto'] font-black">{film?.title} - {film?.year}</h1>
                    <h4 className="text-2xl font-['Roboto'] font-black">Reviews by our users</h4>
                </div>
                {film?.reviews?.length > 0 ?
                    <>
                        <div className="flex justify-center flex-wrap flex-row mb-10 gap-5">
                            {film.reviews.map((review, i) => {
                                return (
                                    <CardTxt key={`review${review.user._id}`}
                                        review={review.review}
                                        rating={<Rating rating={+review.rating} id={review.user._id} />}
                                        reviewer={review.user.username}
                                    />

                                )
                            })}
                        </div>
                    </>
                    :
                    <div className="font-['Roboto'] font-bold text-xl text-center mb-10">This film has no reviews <span className="text-primary">:(</span></div>
                }

                {userID && !alreadyReviewed ?
                    <div className="font-['Roboto'] font-bold text-xl text-center mb-10">Have you seen this film? <label htmlFor="reviewForm" className="text-primary underline cursor-pointer">Add your review!</label></div>
                    :
                    !userID ? <div className="font-['Roboto'] font-bold text-xl text-center mb-10">Have you seen this film? <Link to="/auth" className="text-primary underline cursor-pointer">Sign in</Link> to add your review!</div>
                        :
                        <></>
                }
                <Modal id="reviewForm"
                    body={
                        <Form title="Leave your review on this film" btnText="Submit review" onSubmit={handleSubmit(onSubmit)} btnDisabled={alreadyReviewed}>
                            <div className="my-5">
                                <Textarea register={register} name="review" validation={filmValidation.review} error={errors["review"]} label="Review" />
                            </div>
                            <div className="my-5">
                                <Select register={register} name="rating" validation={filmValidation.rating} error={errors["rating"]} options={[1, 2, 3, 4, 5]} defaultOption="How would you rate this film?" label="Rating" />
                            </div>
                        </Form>}
                /></>}
        </div>
    );
};

export default FilmReviews;