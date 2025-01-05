import { useEffect } from "react";
import Banner from "../components/home/Banner";
import HowItWorksSection from "../components/home/HowItWorksSection";
import MarathonCard from "../components/home/MarathonCard";
import TestimonialsSection from "../components/home/TestimonialsSection";
import UpcomingMarathons from "../components/home/Upcoming";

const Home = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);
    return (
        <div>
            <Banner />
            <MarathonCard />
            <TestimonialsSection />
            <HowItWorksSection />
            <UpcomingMarathons />

        </div>
    );
};

export default Home;