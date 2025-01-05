import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Marathons = () => {
    useEffect(() => {
        document.title = "All Marathons";
    }, []);
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        axios
            .get(`https://run-sphere-server.vercel.app/marathons?sortOrder=${sortOrder}`, { withCredentials: true })
            .then((response) => {
                setMarathons(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching marathons:", error);
                setLoading(false);
            });
    }, [sortOrder]);

    const calculateTimeRemaining = (startDate) => {
        const currentDate = new Date();
        const marathonDate = new Date(startDate);
        return (marathonDate - currentDate) / 1000; // Convert milliseconds to seconds
    };

    if (loading) {
        return <div className="text-center text-2xl font-Body mt-10">Loading...</div>;
    }

    return (
        <div className="bg-Background min-h-screen p-8">
            <h1 className="text-3xl font-Heading font-bold italic text-Primary text-center mb-8">
                ALL MARATHONS
            </h1>
            <div className="text-center mb-6">
                <button
                    className={`px-4 py-2 mr-2 rounded ${sortOrder === 'asc' ? 'bg-Primary text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setSortOrder("asc")}
                >
                    Sort by Oldest
                </button>
                <button
                    className={`px-4 py-2 rounded ${sortOrder === 'desc' ? 'bg-Primary text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setSortOrder("desc")}
                >
                    Sort by Newest
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 md:w-10/12 mx-auto">
                {marathons.map((marathon) => (
                    <div
                        key={marathon._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden text-center"
                    >
                        <img
                            src={marathon.marathonImage}
                            alt={marathon.marathonTitle}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-Heading text-Title mb-2">
                                {marathon.marathonTitle}
                            </h2>
                            <p className="text-sm text-TextColor font-bold mb-2">
                                {marathon.location}
                            </p>
                            <h3 className="text-sm text-TextColor mb-2">
                                Registration:
                            </h3>
                            <p className="text-sm text-TextColor mb-2">
                                Start: {marathon.startRegistration}
                            </p>
                            <p className="text-sm text-TextColor mb-2">
                                End: {marathon.endRegistration}
                            </p>
                            <div className="mt-4 flex flex-col items-center">
                                <h4 className="text-sm text-TextColor font-bold mb-2">Time Remaining:</h4>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={calculateTimeRemaining(marathon.marathonStartDate)}
                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                    colorsTime={[60, 30, 10, 0]}
                                    onComplete={() => ({ shouldRepeat: false })}
                                    size={100}
                                    strokeWidth={7}
                                >
                                    {({ remainingTime }) => {
                                        const days = Math.floor(remainingTime / 86400);
                                        const hours = Math.floor((remainingTime % 86400) / 3600);
                                        const minutes = Math.floor((remainingTime % 3600) / 60);
                                        const seconds = remainingTime % 60;
                                        return (
                                            <div>
                                                <div>{days}d {hours}h</div>
                                                <div>{minutes}m {seconds}s</div>
                                            </div>
                                        );
                                    }}
                                </CountdownCircleTimer>
                            </div>
                            <Link
                                to={`/details/${marathon._id}`}
                                className="w-full bg-Primary text-white btn rounded-md mt-4 font-bold hover:bg-Secondary hover:text-Primary transition"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marathons;
