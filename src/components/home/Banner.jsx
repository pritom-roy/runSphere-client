import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Banner = () => {
    const navigate = useNavigate();
    const swiperRef = useRef(null);

    const navigateToMarathons = () => {
        navigate("/marathons");
    };

    const slides = [
        {
            id: 1,
            title: "Manage Marathons Seamlessly",
            text: "The Marathon Management System is a platform that helps organize marathon events by connecting event organizers with participants.",
            bgClass: "bg-run1"
        },
        {
            id: 2,
            title: "Connect Organizers and Participants",
            text: "Users can create marathons, sign up for events, and manage their registrations in one easy-to-use platform.",
            bgClass: "bg-run2"
        },
        {
            id: 3,
            title: "Empower Your Marathon Events",
            text: "Streamline event management and provide participants with an engaging, seamless experience from start to finish.",
            bgClass: "bg-run3"
        }
    ];

    return (
        <div className="relative w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true }}
                className="w-full h-[80vh]"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className={`w-full h-full bg-cover bg-center ${slide.bgClass}`}>
                        <div className="w-full h-full flex flex-col items-center justify-center bg-black/60 text-white text-center px-4 md:px-8">
                            <h1 className="text-2xl font-Heading text-Primary md:text-4xl font-bold">
                                {slide.title}
                            </h1>
                            <p className="mt-4 font-Body text-sm md:text-lg max-w-3xl">
                                {slide.text}
                            </p>
                            <button
                                onClick={navigateToMarathons}
                                className="mt-6 px-6 py-2 bg-Primary rounded-md text-sm md:text-base font-medium text-white"
                            >
                                Explore Marathons
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;