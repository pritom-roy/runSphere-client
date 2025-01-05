import { FaRegCalendarAlt, FaSignInAlt, FaRunning, FaChartLine } from "react-icons/fa";

const steps = [
    {
        title: "Create an Event",
        description: "Organizers can easily create and customize marathon events.",
        icon: <FaRegCalendarAlt className="w-8 h-8" />,
    },
    {
        title: "Sign Up",
        description: "Participants can browse and register for their favorite marathons.",
        icon: <FaSignInAlt className="w-8 h-8" />,
    },
    {
        title: "Participate",
        description: "Join the event and enjoy a seamless marathon experience.",
        icon: <FaRunning className="w-8 h-8" />,
    },
    {
        title: "Track Results",
        description: "View and share marathon results instantly.",
        icon: <FaChartLine className="w-8 h-8" />,
    },
];

const HowItWorksSection = () => {
    return (
        <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-Heading italic text-center text-gray-800 mb-8">
                    HOW IT WORKS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-Body">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center items-center w-16 h-16 bg-purple-500 text-white rounded-full mx-auto mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
