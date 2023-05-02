const Form = ({ children, title, btnText, onSubmit, btnDisabled }) => {
    return (
        <form onSubmit={onSubmit}>
            <h1 className="text-4xl text-center font-['Roboto'] font-black text-primary">{title}</h1>
            {children}
            <button disabled={btnDisabled} className="btn btn-block btn-primary text-lg font-['Roboto'] font-black" type="submit">{btnText}</button>
        </form>
    );
};

export default Form;