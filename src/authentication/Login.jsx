import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
    const { loginUser, googleSignin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
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
        const password = event.target.password.value;
        loginUser(email, password)
            .then(result => {
                console.log(result.user);
                event.target.reset();
                Toast.fire({
                    icon: 'success',
                    title: "Login Successful",
                });
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                setErrorMessage(error.message);
                Toast.fire({
                    icon: 'error',
                    title: error.message,
                });
            });
        console.log(email, password);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleGoogleLogin = () => {
        googleSignin()
            .then(result => {
                console.log(result.user);
                Toast.fire({
                    icon: 'success',
                    title: "Login Successful",
                });
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    }

    return (
        <div className="flex justify-center items-center flex-col my-14 mx-5">
            <div className="card w-full max-w-sm shadow-2xl bg-white border-t-4 border-Primary">
                <h1 className="text-3xl font-bold text-center mt-5 text-Primary">Login</h1>
                <form onSubmit={handleSubmit} className="card-body pb-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-Primary font-medium">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered border-Primary focus:border-Primary"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-Primary font-medium">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered border-Primary focus:border-Primary"
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-Primary text-white border-none hover:bg-Secondary">
                            Login
                        </button>
                    </div>
                </form>
                <div className="flex flex-col w-full px-8 mb-2">
                    <button onClick={handleGoogleLogin} className="btn bg-Primary text-white border-none hover:bg-Secondary">
                        <FaGoogle /> Login with Google
                    </button>
                </div>
                {errorMessage && <h1 className="text-center text-red-500">{errorMessage}</h1>}
                <p className="text-center mb-4">
                    <span className="text-Primary font-medium">
                        New to this site?{" "}
                    </span>
                    <Link
                        to="/register"
                        className="text-Secondary font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
