const Collapse = ({ title, content }) => {
    return (
        <div className="collapse collapse-plus border border-base-300 bg-neutral/50 rounded-box ">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-3xl font-bold font-['Roboto']">
                {title}
            </div>
            <div className="collapse-content font-['Roboto'] ">
                {content}
            </div>
        </div>
    );
};

export default Collapse;