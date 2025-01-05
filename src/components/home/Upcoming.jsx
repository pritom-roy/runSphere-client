const upcomingMarathons = [
    {
        id: 1,
        image: "/run1.jpg",
        title: "City Marathon 2024",
        date: "January 15, 2024",
        location: "New York, USA",
        description: "Join runners from around the globe for a scenic run through New York City.",
    },
    {
        id: 2,
        image: "/run2.jpg",
        title: "Coastal Run Fest",
        date: "February 10, 2024",
        location: "Sydney, Australia",
        description: "Experience breathtaking coastal views as you race in sunny Sydney.",
    },
    {
        id: 3,
        image: "/run4.jpg",
        title: "Desert Dash",
        date: "March 5, 2024",
        location: "Dubai, UAE",
        description: "Challenge yourself in a unique marathon set amidst Dubai's golden sands.",
    },
    {
        id: 4,
        image: "/run6.jpg",
        title: "Spring Valley Run",
        date: "April 20, 2024",
        location: "Kyoto, Japan",
        description: "Run through vibrant cherry blossoms in the serene Kyoto valleys.",
    },
    {
        id: 5,
        image: "/run7.jpg",
        title: "Mountain Challenge",
        date: "May 25, 2024",
        location: "Denver, USA",
        description: "A thrilling marathon through the rugged beauty of the Rockies.",
    },
    {
        id: 6,
        image: "/run9.jpg",
        title: "Urban Night Run",
        date: "June 14, 2024",
        location: "Paris, France",
        description: "Experience the City of Lights in a dazzling nighttime marathon.",
    },
];

const UpcomingMarathons = () => {
    return (
        <div className="bg-gray-100 py-10">
            <div className="container w-11/12 md:w-10/12 mx-auto">
                <h2 className="text-2xl italic font-Heading text-center mb-8">UPCOMING MARATHONS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-Body">
                    {upcomingMarathons.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                                <p className="text-sm text-gray-600">Date: {event.date}</p>
                                <p className="text-sm text-gray-600">Location: {event.location}</p>
                                <p className="mt-2 text-gray-700">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingMarathons;
