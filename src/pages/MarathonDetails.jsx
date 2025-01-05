import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

function MarathonDetails() {
    useEffect(() => {
        document.title = "Marathon Details";
    }, []);
    const marathon = useLoaderData();
    console.log(marathon);

    const isRegistrationOpen = () => {
        const today = new Date();
        const startDate = new Date(marathon.startRegistration);
        const endDate = new Date(marathon.endRegistration);
        return today >= startDate && today <= endDate;
    };

    return (
        <div className="bg-Background min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <img
                    src={marathon.marathonImage}
                    alt={marathon.marathonTitle}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold font-Heading text-Title mb-4">{marathon.marathonTitle}</h1>
                    <p className="text-TextColor mb-6">{marathon.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <span className="text-TextColor text-sm">Start Registration</span>
                            <span className="text-Title text-lg font-medium">{marathon.startRegistration}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-TextColor text-sm">End Registration</span>
                            <span className="text-Title text-lg font-medium">{marathon.endRegistration}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-TextColor text-sm">Marathon Start Date</span>
                            <span className="text-Title text-lg font-medium">{marathon.marathonStartDate}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-TextColor text-sm">Location</span>
                            <span className="text-Title text-lg font-medium">{marathon.location}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-TextColor text-sm">Running Distance</span>
                            <span className="text-Title text-lg font-medium">{marathon.runningDistance}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-TextColor text-sm">Total Registrations</span>
                            <span className="text-Title text-lg font-medium">{marathon.totalRegistrationCount}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <img
                            src={marathon.creatorPhoto}
                            alt={marathon.creatorName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <span className="block text-Title text-lg font-medium">{marathon.creatorName}</span>
                            <span className="block text-TextColor text-sm">{marathon.creatorEmail}</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        {isRegistrationOpen() ? (
                            <Link
                                to={`/registration/${marathon._id}`}
                                className="px-6 py-2 bg-Primary text-white font-medium rounded-md hover:bg-Secondary hover:text-Primary transition"
                            >
                                Register Now
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="px-6 py-2 bg-gray-400 text-white font-medium rounded-md cursor-not-allowed"
                            >
                                Registration Closed
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarathonDetails;
