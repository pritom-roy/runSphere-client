import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
    const { createUser, updateInfo } = useContext(AuthContext);
    const [eye, setEye] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const toggleEye = () => {
        setEye(!eye);
    };
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
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photo = event.target.photo.value;
        const password = event.target.password.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must have an uppercase and lowercase letter and be at least 6 characters long.");
            Toast.fire({
                icon: 'error',
                title: "Password must have an uppercase and lowercase letter and be at least 6 characters long.",
            });
            return;
        }

        const profileObj = {
            displayName: name,
            photoURL: photo,
        };

        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                Toast.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                });
                updateInfo(profileObj)
                    .then(() => {
                        navigate("/home");
                        event.target.reset();
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                        Toast.fire({
                            icon: 'error',
                            title: errorMessage,
                        });
                    });
            })
            .catch((error) => {
                setErrorMessage(error.message);
                Toast.fire({
                    icon: 'error',
                    title: errorMessage,
                });
            });
    };



    return (
        <div className="flex justify-center items-center flex-col my-10 px-5">
            <div className="card w-full max-w-sm shadow-lg border-t-4 border-Primary rounded-lg">
                <h1 className="text-3xl font-heading font-bold text-center mt-5 text-Primary">
                    Register
                </h1>
                <form onSubmit={handleSubmit} className="card-body">
                    {/* Name Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-Primary font-medium">Name</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered border-Primary focus:outline-none focus:ring-2 focus:ring-Primary"
                            required
                        />
                    </div>
                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-Primary font-medium">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered border-Primary focus:outline-none focus:ring-2 focus:ring-Primary"
                            required
                        />
                    </div>
                    {/* Photo Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-Primary font-medium">Photo URL</span>
                        </label>
                        <input
                            name="photo"
                            type="text"
                            placeholder="Enter your photo URL"
                            className="input input-bordered border-Primary focus:outline-none focus:ring-2 focus:ring-Primary"
                            required
                        />
                    </div>
                    {/* Password Input */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-Primary font-medium">Password</span>
                        </label>
                        <input
                            name="password"
                            type={eye ? "password" : "text"}
                            placeholder="Enter your password"
                            className="input input-bordered border-Primary focus:outline-none focus:ring-2 focus:ring-Primary"
                            required
                        />
                        <div className="absolute right-3 bottom-3">
                            {eye ? (
                                <FaEye
                                    onClick={toggleEye}
                                    className="text-lg cursor-pointer text-Primary"
                                />
                            ) : (
                                <FaEyeSlash
                                    onClick={toggleEye}
                                    className="text-lg cursor-pointer text-Primary"
                                />
                            )}
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button className="btn bg-Primary text-white hover:bg-Secondary border-none">
                            Register
                        </button>
                    </div>
                </form>
                {/* Error Message */}
                {errorMessage && (
                    <p className="text-center text-red-500 md:px-2">{errorMessage}</p>
                )}
                {/* Login Link */}
                <p className="text-center my-4">
                    <span className="text-Primary font-medium">
                        Already registered?{" "}
                    </span>
                    <Link
                        to="/login"
                        className="text-Secondary font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
