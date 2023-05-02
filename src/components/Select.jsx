const Select = ({ register, name, validation, error, options, defaultOption, label }) => {
    return (<>
        <label className="label">
            <span className="label-text text-lg font-['Roboto'] font-black">{label}</span>
        </label>
        <select {...register(name, validation)} className={`select ${error ? "border-error" : "border-primary"} w-full max-w-xs bg-base-100 backdrop-blur-xl`} defaultValue="">
            <option disabled value="">{defaultOption}</option>
            {options.map((option) => {
                return <option key={`${name}${option}`} value={option}>{option}</option>
            })}
        </select>
        {error && <div className="text-error text-sm">{error.message}</div>}
    </>
    )
};

export default Select;