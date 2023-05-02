const Textarea = ({ register, name, validation, error, label, placeholder }) => {
    return (
        <div className="form-control ">
            <label className="label">
                <span className="label-text text-lg font-['Roboto'] font-black">{label}</span>
            </label>
            <textarea {...register(name, validation)} className={`textarea w-full textarea-bordered ${error ? "border-error" : "border-primary"} bg-neutral/20 backdrop-blur-xl`} placeholder={placeholder}></textarea>
            {error && <div className="text-error text-sm">{error.message}</div>}
        </div>
    );
};

export default Textarea;