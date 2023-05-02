const Card = ({ img, title, description, keywords, info, footer }) => {
    return (
        <div className="card md:card-side bg-neutral/50 shadow-xl md:mx-10 my-10">
            <figure className="md:w-64 md:h-auto mx-auto h-96"><img className="md:h-full" src={img} alt={`${title} image`} /></figure>
            <div className="card-body flex justify-between w-fit">
                <div>
                <h2 className="card-title text-primary text-4xl font-['Roboto'] font-black">{title}</h2>
                </div>
                <div className="font-['Roboto'] ">
                    <p className="text-xl mb-2">{info}</p>
                    <p>
                        {keywords.split(",").map((word, i) => {
                            return <span className="badge badge-secondary font-black me-2 p-2.5 mb-2" key={`${title}keyword${i}`}>{word}</span>
                        })}
                    </p>
                    <p>{description}</p>
                </div>
                <div className="card-actions justify-end">
                    {footer}
                </div>
            </div>
        </div>
    )
}

export default Card;