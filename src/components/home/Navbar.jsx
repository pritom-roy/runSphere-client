import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // const location = useLocation();

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("User logged out successfully");
            })
            .catch(error => {
                console.log("Error during log out:", error.message);
            });
    };
    console.log(user)

    return (
        <div className="bg-Secondary text-white font-Body">
            <div className="navbar justify-between w-11/12 md:w-10/12 mx-auto">
                <div className="navbar-start w-auto">
                    <div className="dropdown z-10">
                        <div tabIndex={0} role="button" className="lg:hidden pr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-lg z-[1] mt-3 w-52 p-2 shadow">
                            <Link
                                to="marathons"
                                className="w-full hover:border border-Secondary text-Secondary rounded-md p-1">Marathon</Link>
                            {user?.email ? <Link
                                to="dashboard"
                                className="w-full hover:border border-Secondary text-Secondary rounded-md p-1">Dashboard</Link> : <></>}
                        </ul>
                    </div>
                    <Link to="/" className="text-xl group">
                        <span className="group-hover:text-Primary transition duration-300 group-hover:font-bold">Run</span>
                        <span>Sphere</span>
                    </Link>

                </div>

                <div className="navbar-end w-auto md:gap-10">
                    <ul className="menu menu-horizontal px-1 hidden md:flex">
                        <Link to="marathons" className="hover:text-Primary">MARATHON</Link>
                        {
                            user?.email ? <Link to="dashboard" className="hover:text-Primary pl-4">DASHBOARD</Link> : <></>
                        }
                    </ul>
                    {
                        user?.email ?
                            <div className="relative group flex gap-2 items-center justify-center">
                                <img
                                    className="w-12 h-12 rounded-full object-cover"
                                    src={user.photoURL}
                                    alt="User"
                                />
                                <button
                                    onClick={handleLogout}
                                    className="bg-Primary px-3 py-2 font-bold rounded-md hover:bg-Secondary hover:text-Primary"
                                >
                                    Log out
                                </button>
                            </div>
                            :
                            <div>
                                <Link
                                    to="/login"
                                    className="bg-Primary px-3 py-2 font-bold rounded-l-md hover:bg-Secondary hover:text-Primary">
                                    Login
                                </Link>
                                <Link
                                    to="register"
                                    className="border-l border-l-Secondary bg-Primary px-3 py-2 font-bold rounded-r-md hover:bg-Secondary hover:text-Primary">
                                    Register
                                </Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;