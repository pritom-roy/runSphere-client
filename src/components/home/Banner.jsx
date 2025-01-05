import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const navigateToMarathons = () => {
        navigate("/marathons");
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden">
            <div
                className="flex transition-transform duration-500"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {/* First Slide */}
                <div className="w-full h-[80vh] flex-shrink-0 bg-cover bg-center bg-run1">
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center px-4 md:px-8">
                        <h1 className="text-2xl font-Heading text-Primary md:text-4xl font-bold">
                            Manage Marathons Seamlessly
                        </h1>
                        <p className="mt-4 font-Body text-sm md:text-lg max-w-3xl">
                            The Marathon Management System is a platform that helps organize marathon events by connecting event organizers with participants.
                        </p>
                        <button
                            onClick={navigateToMarathons}
                            className="mt-6 px-6 py-2 bg-Primary rounded-md text-sm md:text-base font-medium text-white"
                        >
                            Explore Marathons
                        </button>
                    </div>
                </div>

                {/* Second Slide */}
                <div className="w-full h-[80vh] flex-shrink-0 bg-cover bg-center bg-run2">
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center px-4 md:px-8">
                        <h1 className="text-2xl font-Heading text-Primary md:text-4xl font-bold">
                            Connect Organizers and Participants
                        </h1>
                        <p className="mt-4 font-Body text-sm md:text-lg max-w-3xl">
                            Users can create marathons, sign up for events, and manage their registrations in one easy-to-use platform.
                        </p>
                        <button
                            onClick={navigateToMarathons}
                            className="mt-6 px-6 py-2 bg-Primary rounded-md text-sm md:text-base font-medium text-white"
                        >
                            Start Today
                        </button>
                    </div>
                </div>

                {/* Third Slide */}
                <div className="w-full h-[80vh] flex-shrink-0 bg-cover bg-center bg-run3">
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center px-4 md:px-8">
                        <h1 className="text-2xl font-Heading text-Primary md:text-4xl font-bold">
                            Empower Your Marathon Events
                        </h1>
                        <p className="mt-4 font-Body text-sm md:text-lg max-w-3xl">
                            Streamline event management and provide participants with an engaging, seamless experience from start to finish.
                        </p>
                        <button
                            onClick={navigateToMarathons}
                            className="mt-6 px-6 py-2 bg-Primary rounded-md text-sm md:text-base font-medium text-white"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                onClick={prevSlide}
            >
                &lt;
            </button>
            <button
                className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                onClick={nextSlide}
            >
                &gt;
            </button>
        </div>
    );
};

export default Banner;
