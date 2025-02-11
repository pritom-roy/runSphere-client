import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import authAnimation from "../assets/auth.json";

const Login = () => {
    const { loginUser, googleSignin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(email, password)
            .then(result => {
                Toast.fire({ icon: 'success', title: "Login Successful" });
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                setErrorMessage(error.message);
                Toast.fire({ icon: 'error', title: error.message });
            });
    };

    const handleGoogleLogin = () => {
        googleSignin()
            .then(result => {
                Toast.fire({ icon: 'success', title: "Login Successful" });
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => setErrorMessage(error.message));
    }

    const handleQuickLogin = () => {
        setEmail("jasonroy@gmail.com");
        setPassword("1234aA");
    }

    return (
        <div className="flex justify-center items-center py-7 md:py-20 bg-gray-100 px-5">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center md:gap-8">
                <div className="flex-1 w-full md:w-1/2">
                    <h1 className="text-4xl font-bold text-center text-Primary">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-Primary font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered border-Primary focus:ring-2 focus:ring-Primary w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-Primary font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered border-Primary focus:ring-2 focus:ring-Primary w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn bg-Primary text-white border-none hover:bg-Secondary w-full py-3 rounded-lg shadow-md">
                            Login
                        </button>
                    </form>
                    <button onClick={handleGoogleLogin} className="btn bg-Primary text-white border-none hover:bg-Secondary mt-4 w-full py-3 rounded-lg shadow-md flex justify-center items-center gap-2">
                        <FaGoogle /> Login with Google
                    </button>
                    {errorMessage && <h1 className="text-center text-red-500 mt-2">{errorMessage}</h1>}
                    <p className="text-center mt-4">
                        <span className="text-Primary font-medium">New here? </span>
                        <Link to="/register" className="text-Secondary font-semibold hover:underline">Register</Link>
                    </p>
                </div>
                <div className="flex-1 flex flex-col-reverse md:flex-col items-center">
                    <Lottie animationData={authAnimation} className="w-72" />
                    <button onClick={handleQuickLogin} className="btn bg-Primary text-white border-none hover:bg-Secondary mt-6 w-3/4 py-3 rounded-lg shadow-md">
                        Quick Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;