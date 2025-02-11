import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const MyApplyList = () => {
    useEffect(() => {
        document.title = "My Apply List";
    }, []);
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [currentApplication, setCurrentApplication] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, [user, searchTerm]);

    const fetchApplications = () => {
        if (user?.email) {
            setLoading(true);
            axios
                .get(`https://run-sphere-server.vercel.app/applications?email=${user.email}&search=${searchTerm}`, { withCredentials: true })
                .then((response) => setApplications(response.data))
                .catch((error) => console.error("Error fetching applications:", error))
                .finally(() => setLoading(false));
        }
    };

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
                    .delete(`https://run-sphere-server.vercel.app/applications/${id}`, { withCredentials: true })
                    .then(() => {
                        setApplications(applications.filter((app) => app._id !== id));
                        Swal.fire("Deleted!", "Your application has been deleted.", "success");
                    })
                    .catch((error) => console.error("Error deleting application:", error));
            }
        });
    };

    const handleUpdate = (application) => {
        setCurrentApplication(application);
        document.getElementById("update_modal").showModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentApplication((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            contactNumber: e.target.contactNumber.value,
            additionalInfo: e.target.additionalInfo.value,
        };

        axios
            .put(`https://run-sphere-server.vercel.app/applications/${currentApplication._id}`, updatedData, { withCredentials: true })
            .then(() => {
                setApplications((prev) =>
                    prev.map((app) =>
                        app._id === currentApplication._id ? { ...app, ...updatedData } : app
                    )
                );
                Swal.fire("Updated!", "Your application has been updated.", "success");
                document.getElementById("update_modal").close();
            })
            .catch((error) => console.error("Error updating application:", error));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="w-11/12 md:w-10/12 mx-auto">
            <h1 className="text-2xl mb-4 text-Primary text-center font-Heading">My Apply List</h1>

            <input
                type="text"
                placeholder="Search by Marathon Title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {loading ? (
                <Loading />
            ) : (<>
                <div className="hidden md:block mb-8">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
                                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2">First Name</th>
                                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                                <th className="border border-gray-300 px-4 py-2">Contact Number</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app._id}>
                                    <td className="border border-gray-300 px-4 py-2">{app.marathonTitle}</td>
                                    <td className="border border-gray-300 px-4 py-2">{app.startDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{app.firstName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{app.lastName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{app.contactNumber}</td>
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

                <div className="block md:hidden">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="border border-gray-300 rounded-lg p-4 shadow-md mb-4"
                        >
                            <h2 className="text-lg font-semibold mb-2">{app.marathonTitle}</h2>
                            <p>
                                <span className="font-medium">Start Date:</span> {app.startDate}
                            </p>
                            <p>
                                <span className="font-medium">First Name:</span> {app.firstName}
                            </p>
                            <p>
                                <span className="font-medium">Last Name:</span> {app.lastName}
                            </p>
                            <p>
                                <span className="font-medium">Contact Number:</span> {app.contactNumber}
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
                        {currentApplication && (
                            <form onSubmit={handleUpdateSubmit} className="font-Body">
                                <div className="form-control mb-2">
                                    <label className="mb-1">Marathon Title</label>
                                    <input
                                        type="text"
                                        name="marathonTitle"
                                        value={currentApplication.marathonTitle}
                                        className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary cursor-not-allowed"
                                        readOnly
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="mb-1">Marathon Start Date</label>
                                    <input
                                        type="text"
                                        name="startDate"
                                        value={currentApplication.startDate}
                                        className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary cursor-not-allowed"
                                        readOnly
                                    />
                                </div>

                                <div className="form-control mb-2">
                                    <label className="mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={currentApplication.firstName}
                                        onChange={handleInputChange}
                                        className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary"
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={currentApplication.lastName}
                                        onChange={handleInputChange}
                                        className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary"
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="mb-1">Contact Number</label>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        value={currentApplication.contactNumber}
                                        onChange={handleInputChange}
                                        className="w-full border border-Secondary rounded-md px-3 py-2 focus:outline-Secondary"
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="mb-1">Additional Info</label>
                                    <textarea
                                        name="additionalInfo"
                                        value={currentApplication.additionalInfo}
                                        onChange={handleInputChange}
                                        className="textarea textarea-bordered"
                                    />
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

            </>)}

        </div>
    );
};

export default MyApplyList;