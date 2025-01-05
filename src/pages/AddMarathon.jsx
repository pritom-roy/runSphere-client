import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const AddMarathon = () => {
    useEffect(() => {
        document.title = "Add Marathon";
    }, []);
    const [startRegistration, setStartRegistration] = useState(null);
    const [endRegistration, setEndRegistration] = useState(null);
    const [marathonStartDate, setMarathonStartDate] = useState(null);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const marathonTitle = event.target.marathonTitle.value;
        const location = event.target.location.value;
        const runningDistance = event.target.runningDistance.value;
        const description = event.target.description.value;
        const marathonImage = event.target.marathonImage.value;

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedStartRegistration = startRegistration
            ? startRegistration.toLocaleDateString('en-US', options)
            : null;
        const formattedEndRegistration = endRegistration
            ? endRegistration.toLocaleDateString('en-US', options)
            : null;
        const formattedMarathonStartDate = marathonStartDate
            ? marathonStartDate.toLocaleDateString('en-US', options)
            : null;

        const newMarathon = {
            marathonTitle,
            startRegistration: formattedStartRegistration,
            endRegistration: formattedEndRegistration,
            marathonStartDate: formattedMarathonStartDate,
            location,
            runningDistance,
            description,
            marathonImage,
            createdAt: new Date().toISOString(),
            totalRegistrationCount: 0,
            creatorEmail: user.email,
            creatorName: user.displayName,
            creatorPhoto: user.photoURL
        };

        try {
            const response = await axios.post("https://run-sphere-server.vercel.app/marathons", newMarathon);
            if (response.status === 201 || response.data.insertedId) {
                Toast.fire({
                    icon: "success",
                    title: "Marathon added successfully",
                });
                event.target.reset();
                setStartRegistration(null);
                setEndRegistration(null);
                setMarathonStartDate(null);
            }
        } catch (error) {
            console.error("Error adding marathon:", error);
            Toast.fire({
                icon: "error",
                title: "Failed to add marathon. Please try again.",
            });
        }
    };

    return (
        <div className="bg-Background p-8 rounded-2xl mb-6 shadow-lg max-w-4xl mx-auto my-2">
            <h1 className="text-3xl font-Heading text-Primary text-center mb-4">
                Create a Marathon Event
            </h1>
            <p className="text-sm text-Text font-Body text-center mb-8">
                Organize a memorable marathon event and bring the community together.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 font-Body">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-body text-Text mb-1">
                            Marathon Title
                        </label>
                        <input
                            type="text"
                            name="marathonTitle"
                            placeholder="Enter marathon title"
                            required
                            className="w-full p-2 border rounded-md text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-body text-Text mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter location"
                            required
                            className="w-full p-2 border rounded-md text-sm"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-body text-Text mb-1">
                            Start Registration Date
                        </label>
                        <DatePicker
                            selected={startRegistration}
                            onChange={(date) => setStartRegistration(date)}
                            className="w-full p-2 border rounded-md text-sm"
                            placeholderText="Select start date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-body text-Text mb-1">
                            End Registration Date
                        </label>
                        <DatePicker
                            selected={endRegistration}
                            onChange={(date) => setEndRegistration(date)}
                            className="w-full p-2 border rounded-md text-sm"
                            placeholderText="Select end date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-body text-Text mb-1">
                            Marathon Start Date
                        </label>
                        <DatePicker
                            selected={marathonStartDate}
                            onChange={(date) => setMarathonStartDate(date)}
                            className="w-full p-2 border rounded-md text-sm"
                            placeholderText="Marathon start date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-body text-Text mb-1">
                            Running Distance
                        </label>
                        <select
                            name="runningDistance"
                            required
                            className="w-full p-2 border rounded-md text-sm"
                        >
                            <option value="25k">25k</option>
                            <option value="10k">10k</option>
                            <option value="3k">3k</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-body text-Text mb-1">
                            Marathon Image URL
                        </label>
                        <input
                            type="text"
                            name="marathonImage"
                            placeholder="Enter image URL"
                            required
                            className="w-full p-2 border rounded-md text-sm"
                        />
                    </div>
                </div>

                {/* Row 4 */}
                <div>
                    <label className="block text-sm font-body text-Text mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Describe your marathon in detail"
                        rows="4"
                        required
                        className="w-full p-2 border rounded-md text-sm"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-Primary text-Secondary hover:bg-Secondary font-semibold hover:text-white font-body rounded-md transition"
                    >
                        Create Marathon
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMarathon;
