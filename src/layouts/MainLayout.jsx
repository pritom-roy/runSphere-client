import { Outlet } from "react-router-dom";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div>
                <Navbar />
            </div>
            <div className="flex-grow">
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;