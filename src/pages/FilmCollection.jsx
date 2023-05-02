import { useGetUserID } from "../hooks/useGetUser";
import { useGetFilms } from "../hooks/useGetFilms";
import { Link } from "react-router-dom";
import CardImg from "../components/CardImg";
import Loader from "../components/Loader";

//  Where a user's collection is displayed (liked and disliked films)
const FilmCollection = () => {
    const userID = useGetUserID();
    const { loading, films, likedFilms, dislikedFilms } = useGetFilms();
    return (
        <div className="container mx-auto mt-32 mb-10">
            <div className="grid place-items-center">
                {!userID ? <div className="font-['Roboto'] font-bold text-4xl mt-20">You must <Link to="/auth" className="text-primary underline">sign in</Link> to view your collection</div>
                    :
                    <>
                        {loading ? <Loader /> :
                            <div>
                                <h2 className="text-4xl text-center font-['Roboto'] font-black text-primary">Liked films</h2>
                                {likedFilms?.length > 0 ?
                                    films?.map((film) => {
                                        if (likedFilms?.includes(film._id)) {
                                            return (
                                                <CardImg key={film._id}
                                                    img={film.image}
                                                    title={film.title}
                                                    description={film.description}
                                                    keywords={film.genres}
                                                    info={film.year}
                                                />
                                            )
                                        }
                                    })
                                    :
                                    <div className="text-xl text-center font-['Roboto'] font-black mt-10 mb-10">You haven't liked any film!</div>
                                }
                                <h2 className="text-4xl text-center font-['Roboto'] font-black text-primary">Disliked films</h2>
                                {dislikedFilms?.length > 0 ?

                                    films?.map((film) => {
                                        if (dislikedFilms?.includes(film._id)) {
                                            return (
                                                <CardImg key={film._id}
                                                    img={film.image}
                                                    title={film.title}
                                                    description={film.description}
                                                    keywords={film.genres}
                                                    info={film.year}
                                                />
                                            )
                                        }
                                    })
                                    :
                                    <div className="text-xl text-center font-['Roboto'] font-black mt-10 mb-10">You haven't disliked any film!</div>
                                }
                            </div>}
                    </>
                }
            </div>
        </div>
    )
}

export default FilmCollection;