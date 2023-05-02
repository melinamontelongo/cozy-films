const InputGroup = ({ register, name, validation, error, labelText, type, placeholder }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text text-lg font-['Roboto'] font-black">{labelText}</span>
            </label>
            <input {...register(name, validation)} type={type} placeholder={placeholder} className={`input font-['Roboto'] w-full input-bordered ${error ? "border-error" : "border-primary"} bg-neutral/20 backdrop-blur-xl`} />
            {error && <div className="text-error text-sm">{error.message}</div>}
        </div>
    );
};

export default InputGroup;