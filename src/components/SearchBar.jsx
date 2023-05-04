const SearchBar = ({ onSubmit, register, name, validation, error, placeholder }) => {
    return (
        <form onSubmit={onSubmit} className="w-full">
            <div className="form-control">
                <div className="input-group">
                    <input type="text" placeholder={placeholder} className={`input font-['Roboto'] w-full input-bordered ${error ? "border-error" : "border-primary"} bg-neutral/20 backdrop-blur-xl placeholder:text-neutral`} {...register(name, validation)} />
                    <button className="btn btn-square btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                {error && <div className="text-error text-sm">{error.message}</div>}
            </div>
        </form>
    );
};

export default SearchBar;