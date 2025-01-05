import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function MarathonRegistration() {
    useEffect(() => {
        document.title = "Marathon Registration";
    }, []);
    const marathon = useLoaderData();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useContext(AuthContext);

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const marathonTitle = event.target.marathonTitle.value;
        const startDate = event.target.startDate.value;
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const contactNumber = event.target.contactNumber.value;
        const additionalInfo = event.target.additionalInfo.value;

        const registrationData = {
            email: user.email,
            marathonTitle,
            startDate,
            firstName,
            lastName,
            contactNumber,
            additionalInfo,
        };

        setIsSubmitting(true);

        try {
            await axios.post("https://run-sphere-server.vercel.app/applications", registrationData, { withCredentials: true });
            await axios.patch(`https://run-sphere-server.vercel.app/marathons/${marathon._id}`, { withCredentials: true });

            Toast.fire({
                icon: "success",
                title: "Registration Successful",
            });

            event.target.reset();
            navigate("/marathons")

        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: "Error in updating",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-Background min-h-screen flex items-center justify-center p-8">
            <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold font-Heading text-Title mb-4">Register for {marathon.marathonTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-4 font-Body">
                    <div>
                        <label className="block text-sm font-medium text-TextColor">Email (Auto-filled)</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-TextColor">Marathon Title</label>
                        <input
                            type="text"
                            name="marathonTitle"
                            value={marathon.marathonTitle}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-TextColor">Start Date</label>
                        <input
                            type="text"
                            name="startDate"
                            value={marathon.marathonStartDate}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-TextColor">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-TextColor">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-TextColor">Contact Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-TextColor">Additional Info</label>
                        <textarea
                            name="additionalInfo"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            rows="3"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-Primary text-white py-2 rounded-md mt-4 hover:bg-Secondary hover:text-Primary transition"
                    >
                        {isSubmitting ? "Submitting..." : "Register Now"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MarathonRegistration;
