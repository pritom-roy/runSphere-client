import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import DatePicker from "react-datepicker";

const MyMarathons = () => {
    useEffect(() => {
        document.title = "My Marathons";
    }, []);
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [marathonData, setmarathonData] = useState(null);

    const [startRegistration, setStartRegistration] = useState(null);
    const [endRegistration, setEndRegistration] = useState(null);
    const [marathonStartDate, setMarathonStartDate] = useState(null);

    const [trackStart, settrackStart] = useState(null);
    const [trackEnd, settrackEnd] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://run-sphere-server.vercel.app/marathons?email=${user.email}`, { withCredentials: true })
                .then((response) => setApplications(response.data))
                .catch((error) => console.error("Error fetching applications:", error));
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://run-sphere-server.vercel.app/marathons/${id}`, { withCredentials: true })
                    .then(() => {
                        setApplications(applications.filter((app) => app._id !== id));
                        Swal.fire("Deleted!", "Your application has been deleted.", "success");
                    })
                    .catch((error) => console.error("Error deleting application:", error));
            }
        });
    };

    const handleUpdate = (curr) => {
        setmarathonData(curr);
        setStartRegistration(curr.startRegistration);
        setEndRegistration(curr.endRegistration);
        setMarathonStartDate(curr.marathonStartDate);

        settrackStart(curr.startRegistration);
        settrackEnd(curr.endRegistration);

        document.getElementById("update_modal").showModal();
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setmarathonData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChange = (e) => {
        setmarathonData({
            ...marathonData,
            runningDistance: e.target.value
        });
    };

    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        const location = event.target.location.value;
        const runningDistance = event.target.runningDistance.value;
        const description = event.target.description.value;
        const marathonImage = event.target.marathonImage.value;

        let formattedStartRegistration = trackStart;
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        if (trackStart !== startRegistration) {
            formattedStartRegistration = startRegistration
                ? startRegistration.toLocaleDateString('en-US', options)
                : null;
        }

        let formattedEndRegistration = trackEnd;
        if (trackEnd !== endRegistration) {
            formattedEndRegistration = endRegistration
                ? endRegistration.toLocaleDateString('en-US', options)
                : null;
        }

        const updatedData = {
            startRegistration: formattedStartRegistration,
            endRegistration: formattedEndRegistration,
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

        console.log(updatedData);

        axios
            .put(`https://run-sphere-server.vercel.app/marathons/${marathonData._id}`, updatedData, { withCredentials: true })
            .then(() => {
                setApplications((prev) =>
                    prev.map((app) =>
                        app._id === marathonData._id ? { ...app, ...updatedData } : app
                    )
                );
                Swal.fire("Updated!", "Your application has been updated.", "success");
                document.getElementById("update_modal").close();
            })
            .catch((error) => console.error("Error updating application:", error));
    };

    console.log(marathonData);

    // "_id": "676be73f3085c07a7af97df7",
    // "marathonTitle": "dff",
    // "startRegistration": "Dec 4, 2024",
    // "endRegistration": "Dec 19, 2024",
    // "marathonStartDate": "Dec 27, 2024",
    // "location": "Dhaka",
    // "runningDistance": "25k",
    // "description": "fdsafhjashfd",
    // "marathonImage": "ddd",
    // "createdAt": "2024-12-25T11:06:39.830Z",
    // "totalRegistrationCount": 3,
    // "creatorEmail": "makhna@lulululu.com",
    // "creatorName": "jk_stiphen",
    // "creatorPhoto": "https://i.ibb.co.com/vqhx6hx/yoyo.jpg"

    return (
        <div className="w-11/12 md:w-10/12 mx-auto">
            <h1 className="text-2xl mb-4 text-Primary text-center font-Heading">My Marathons</h1>

            <div className="hidden lg:block mb-8">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                            <th className="border border-gray-300 px-4 py-2">Start Date</th>
                            <th className="border border-gray-300 px-4 py-2">End Date</th>
                            <th className="border border-gray-300 px-4 py-2">Start Run</th>
                            <th className="border border-gray-300 px-4 py-2">Distance</th>
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id}>
                                <td className="border border-gray-300 px-4 py-2">{app.marathonTitle}</td>
                                <td className="border border-gray-300 px-4 py-2">{app.location}</td>
                                <td className="border border-gray-300 px-4 py-2">{app.startRegistration}</td>
                                <td className="border border-gray-300 px-4 py-2">{app.endRegistration}</td>
                                <td className="border border-gray-300 px-4 py-2">{app.marathonStartDate}</td>
                                <td className="border border-gray-300 px-4 py-2">{app.runningDistance}</td>
                                <td className="border border-gray-300 px-4 py-2">{app.marathonImage}</td>
                                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                    <button
                                        className="btn w-full flex-1 bg-Primary text-white py-2 rounded-md hover:bg-Secondary hover:text-Primary transition"
                                        onClick={() => handleUpdate(app)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn w-full flex-1 hover:bg-Secondary hover:text-white"
                                        onClick={() => handleDelete(app._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="block lg:hidden">
                {applications.map((app) => (
                    <div
                        key={app._id}
                        className="border border-gray-300 rounded-lg p-4 shadow-md mb-4"
                    >
                        <h2 className="text-lg font-semibold mb-2">{app.marathonTitle}</h2>
                        <p>
                            <span className="font-medium">Location: </span> {app.location}
                        </p>
                        <p>
                            <span className="font-medium">Start Date: </span> {app.startRegistration}
                        </p>
                        <p>
                            <span className="font-medium">End Date: </span> {app.endRegistration}
                        </p>
                        <p>
                            <span className="font-medium">Run Start: </span> {app.marathonStartDate}
                        </p>
                        <p>
                            <span className="font-medium">Distance: </span> {app.runningDistance}
                        </p>
                        <p>
                            <span className="font-medium">Image: </span> {app.marathonImage}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <button
                                className="btn w-full flex-1 bg-Primary text-white py-2 rounded-md hover:bg-Secondary hover:text-Primary transition"
                                onClick={() => handleUpdate(app)}
                            >
                                Update
                            </button>
                            <button
                                className="btn w-full flex-1 hover:bg-Secondary hover:text-white"
                                onClick={() => handleDelete(app._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center font-Heading text-Primary pb-4">Update Registration</h3>
                    {marathonData && (
                        <form onSubmit={handleUpdateSubmit} className="font-Body">
                            <div className="form-control mb-2">
                                <label className="mb-1">Marathon Title</label>
                                <input
                                    type="text"
                                    name="marathonTitle"
                                    defaultValue={marathonData.marathonTitle}
                                    className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={marathonData.location}
                                    onChange={handleInputChange}
                                    className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary"
                                />
                            </div>
                            <div className="form-control mb-2">
                                <label className="mb-1">Registration Start:</label>
                                <DatePicker
                                    selected={startRegistration}
                                    onChange={(date) => setStartRegistration(date)}
                                    className="w-full p-2 border rounded-md text-sm"
                                    placeholderText="Select start date"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="form-control mb-2">
                                <label className="mb-1">Registration End</label>
                                <DatePicker
                                    selected={endRegistration}
                                    onChange={(date) => setEndRegistration(date)}
                                    className="w-full p-2 border rounded-md text-sm"
                                    placeholderText="Select end date"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="form-control mb-2">
                                <label className="mb-1">Marathon Start</label>
                                <input
                                    type="text"
                                    name="marathonTitle"
                                    defaultValue={marathonStartDate}
                                    className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary cursor-not-allowed"
                                    readOnly
                                />

                            </div>
                            <div className="form-control mb-2">
                                <label className="mb-1">Distance</label>
                                <select
                                    name="runningDistance"
                                    required
                                    className="w-full p-2 border rounded-md text-sm"
                                    value={marathonData.runningDistance}
                                    onChange={handleChange}
                                >
                                    <option value="25k">25k</option>
                                    <option value="10k">10k</option>
                                    <option value="3k">3k</option>
                                </select>
                            </div>

                            <div className="form-control mb-2">
                                <label className="mb-1">Image</label>
                                <input
                                    type="text"
                                    name="marathonImage"
                                    defaultValue={marathonData.marathonImage}
                                    onChange={handleInputChange}
                                    className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary"
                                />
                            </div>
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
                                    defaultValue={marathonData.description}
                                ></textarea>
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn bg-Primary text-white py-2 rounded-md hover:bg-Secondary hover:text-Primary transition">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => document.getElementById("update_modal").close()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyMarathons;
