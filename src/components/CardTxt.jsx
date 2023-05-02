const CardTxt = ({ rating, review, reviewer }) => {
    return (
        <div className="card w-96 bg-neutral/50 shadow-xl">
            <div className="card-body font-['Roboto']">
                <div className="card-title">{rating}</div>
                <div className="flex gap-2">
                    <p className="text-lg">{review}</p>
                </div>
                <div className="justify-end">
                    <p className="italic">- {reviewer}</p>
                </div>
            </div>
        </div>
    );
};

export default CardTxt;