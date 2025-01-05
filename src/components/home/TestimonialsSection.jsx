const testimonials = [
    {
        name: "John Doe",
        role: "Marathon Participant",
        quote: "This platform made signing up for marathons so easy!",
        image: "/client2.jpg",
    },
    {
        name: "Jimmy Cugan",
        role: "Event Management",
        quote: "Bringing together athletes from all walks of life in the spirit of competition.",
        image: "/client1.jpg",
    },
    {
        name: "Jane Smith",
        role: "Event Organizer",
        quote: "A seamless experience for both organizers and participants.",
        image: "/client.jpg",
    },
];

const TestimonialsSection = () => {
    return (
        <section className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-Heading italic text-center text-gray-800 mb-8">
                    WHAT PEOPLE SAY
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-Body">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                            <p className="text-gray-700 italic mb-4">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>
                            <div className="flex items-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="text-gray-900 font-bold">{testimonial.name}</h3>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
