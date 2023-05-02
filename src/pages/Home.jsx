import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url("cozyfilms.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold font-['Oleo_Script']">Welcome to <span className="text-primary">Cozy Films</span></h1>
                    <p className="mb-5 font-['Roboto'] font-black">Your go-to place to browse through hundreds of comfort films curated and reviewed by our users.</p>
                    <div className="grid grid-cols-2 gap-5">

                    <Link to="/catalog" className="btn btn-primary font-['Roboto'] font-black">View catalog</Link>
                    <Link to="/about" className="btn btn-primary font-['Roboto'] font-black">About</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;