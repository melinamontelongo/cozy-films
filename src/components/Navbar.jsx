import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { FaHome, FaUserAlt } from "react-icons/fa";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { ImExit, ImEnter, ImBooks } from "react-icons/im";
import { RiVideoAddFill } from "react-icons/ri"

import { useGetUsername } from "../hooks/useGetUser";

//  Responsive, present in all routes, handles logout logic
const Navbar = () => {
    //  Get credentials
    const [cookies, setCookies] = useCookies(["access_token"]);
    const username = useGetUsername();

    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("username");
        navigate("/auth");
    }

    return (
        <div className="navbar bg-neutral/50 backdrop-blur-xl text-primary fixed top-0 left-0 right-0 shadow-xl z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <NavLink to="/">
                                <div className="flex justify-center items-center gap-1 p-1 md:mx-2">
                                    <span><FaHome /></span>
                                    <span className="font-['Roboto'] font-black">Home</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/catalog">
                                <div className="flex justify-center items-center gap-1 p-1 md:mx-2">
                                    <span><ImBooks /></span>
                                    <span className="font-['Roboto'] font-black">Catalog</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/add-film">
                                <div className="flex justify-center items-center gap-1 p-1 md:mx-2">
                                    <span><RiVideoAddFill /></span>
                                    <span className="font-['Roboto'] font-black">Add Film</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/collection">
                                <div className="flex justify-center items-center gap-1 p-1 md:mx-2">
                                    <span><BsFillCollectionPlayFill /></span>
                                    <span className="font-['Roboto'] font-black">Collection</span>
                                </div>
                            </NavLink>
                        </li>
                        {!cookies.access_token ?
                            <li>
                                <NavLink to="/auth">
                                    <div className="flex justify-center items-center gap-1 p-1 md:mx-2">
                                        <span><ImEnter /></span>
                                        <span className="font-['Roboto'] font-black">Sign Up / Sign In</span>
                                    </div>
                                </NavLink>
                            </li>
                            :

                            <li>
                                <button onClick={logout}>
                                    <div className="flex justify-center items-center gap-1 p-1 md:mx-2">
                                        <span><ImExit /></span>
                                        <span className="font-['Roboto'] font-black">Logout</span>
                                        (<span><FaUserAlt /></span>
                                        <span className="font-['Roboto'] font-black">{username}</span>)
                                    </div>
                                </button>
                            </li >
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost capitalize text-4xl font-['Oleo_Script']">Cozy Films</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to="/">
                            <div className="flex justify-center items-center gap-1 mx-auto p-1 md:mx-2">
                                <span><FaHome /></span>
                                <span className="font-['Roboto'] font-black">Home</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog">
                            <div className="flex justify-center items-center gap-1 mx-auto p-1 md:mx-2">
                                <span><ImBooks /></span>
                                <span className="font-['Roboto'] font-black">Catalog</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-film">
                            <div className="flex justify-center items-center mx-auto gap-1 p-1 md:mx-2">
                                <span><RiVideoAddFill /></span>
                                <span className="font-['Roboto'] font-black">Add Film</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/collection">
                            <div className="flex justify-center items-center gap-1 mx-auto p-1 md:mx-2">
                                <span><BsFillCollectionPlayFill /></span>
                                <span className="font-['Roboto'] font-black">Collection</span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end hidden lg:flex">
                {!cookies.access_token ?
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink to="/auth">
                                <div className="flex justify-center items-center gap-1 mx-auto p-1 md:mx-2">
                                    <span><ImEnter /></span>
                                    <span className="font-['Roboto'] font-black">Sign Up / Sign In</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    :
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="flex justify-center items-center gap-1 mx-auto p-1 md:mx-2 cursor-pointer">
                            <span><FaUserAlt /></span>
                            <span className="font-['Roboto'] font-black ">{username}</span>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52">
                            <button onClick={logout}>
                                <div className="flex justify-center items-center gap-1 mx-auto p-1 md:mx-2">
                                    <span><ImExit /></span>
                                    <span className="font-['Roboto'] font-black">Logout</span>
                                </div>
                            </button>
                        </ul>
                    </div>
                }
            </div>
        </div >
    )
}

export default Navbar;