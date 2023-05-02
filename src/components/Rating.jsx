import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, id }) => {
    let count = 5;
    return (
        <div className="flex">
            {[...Array(rating)].map((x, i) => {
                count -= 1;
                return (
                    <AiFillStar className="text-primary text-xl" key={`star-full${i}${id}`} />
                )
            })}
            {count > 0 && [...Array(count)].map((x, i) => {
                return (
                    <AiOutlineStar className="text-primary text-xl" key={`star-outline${i}${id}`} />
                )
            })}
        </div>
    );
};

export default Rating;