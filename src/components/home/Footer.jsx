import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-Secondary text-white py-10">
            <div className="container">
                <div className="flex justify-between w-10/12 mx-auto">
                    <a
                        target="_blank"
                        href="https://www.facebook.com"
                        className="text-white flex justify-center items-center group">
                        <div className="text-lg transition ease-in-out group-hover:border-Primary group-hover:bg-Primary p-4 rounded-full border"><FaFacebookF /></div>
                        <div><h1 className="md:block pl-4 hidden font-Body">FACEBOOK</h1></div>
                    </a>
                    <a
                        target="_blank"
                        href="https://www.x.com"
                        className="text-white flex justify-center items-center group">
                        <div className="text-lg transition ease-in-out group-hover:border-Primary group-hover:bg-Primary p-4 rounded-full border"><FaXTwitter /></div>
                        <div><h1 className="md:block pl-4 hidden font-Body">X</h1></div>
                    </a>
                    <a
                        target="_blank"
                        href="https://www.threads.com"
                        className="text-white flex justify-center items-center group">
                        <div className="text-lg transition ease-in-out group-hover:border-Primary group-hover:bg-Primary p-4 rounded-full border"><FaThreads /></div>
                        <div><h1 className="md:block pl-4 hidden font-Body">THREADS</h1></div>
                    </a>
                    <a
                        target="_blank"
                        href="https://www.instagram.com/Shwapno.ACILL"
                        className="text-white flex justify-center items-center group">
                        <div className="text-lg transition ease-in-out group-hover:border-Primary group-hover:bg-Primary p-4 rounded-full border"><FaInstagram /></div>
                        <div><h1 className="md:block pl-4 hidden font-Body">INSTAGRAM</h1></div>
                    </a>
                    <a
                        target="_blank"
                        href="https://www.pinterest.com"
                        className="text-white flex justify-center items-center group">
                        <div className="text-lg transition ease-in-out group-hover:border-Primary group-hover:bg-Primary p-4 rounded-full border"><FaPinterestP /></div>
                        <div><h1 className="md:block pl-4 hidden font-Body">PINTEREST</h1></div>
                    </a>
                </div>

                <hr className="h-[0.1px] my-10" />

                <div className="flex justify-between flex-col md:flex-row w-11/12 md:w-10/12 mx-auto">

                    <div className="max-w-[450px]">
                        <h2 className="font-Heading text-3xl font-bold mb-3"><span className="text-Primary">Run</span>Sphere</h2>
                        <p className="text-sm text-TextColor text-Body">
                            Stay fit and healthy with our running programs. Search the calendar and join our community to enjoy weekly runs and races. Bring peace to your mind and strength to your body.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-Heading text-white text-xl font-bold mb-3">USEFUL LINKS</h3>
                        <ul className="text-sm text-TextColor space-y-2 text-Body">
                            <li>
                                <Link to="/" className="hover:text-white">Home</Link>
                            </li>
                            <li>
                                <Link to="marathons" className="hover:text-white">Marathons</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-Heading text-white text-xl font-bold mb-3">CONTACTS</h3>
                        <ul className="text-sm text-TextColor space-y-2 text-Body">
                            <li>
                                Location: 123, New Lenox Chicago, IL 60606
                            </li>
                            <li>
                                Phone: <a href="tel:123-456-7890" className="hover:text-white text-Primary">123-456-7890</a>
                            </li>
                            <li>
                                Email: <a href="mailto:info@yoursite.com" className="hover:text-white text-Primary">info@runsphere.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="text-sm w-11/12 md:w-10/12 mx-auto mt-12 font-Body">
                    RunSphere
                    <span className="text-TextColor"> © 2024. All rights reserved.</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
