import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Toast.fire({
            icon: 'success',
            title: "Thank you for reaching out! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 lg:px-20 bg-auth bg-cover">
            <h1 className="text-3xl font-bold text-Primary mb-6">Contact Us</h1>
            <div className="w-full max-w-2xl bg-white/95 p-6 rounded-lg shadow-md">
                <p className="text-gray-600 text-center mb-4">Have any questions? Feel free to reach out to us.</p>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="flex items-center text-gray-700 mb-4 md:mb-0">
                        <FaPhone className="text-Primary text-xl mr-2" />
                        <span>+8801732792640</span>
                    </div>
                    <div className="flex items-center text-gray-700 mb-4 md:mb-0">
                        <FaEnvelope className="text-Primary text-xl mr-2" />
                        <span>contact@runsphere.com</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="text-Primary text-xl mr-2" />
                        <span>123, New Lenox Chicago</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="input input-bordered mb-4 border-Primary focus:border-Primary"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="input input-bordered mb-4 border-Primary focus:border-Primary"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        className="textarea textarea-bordered border-Primary focus:border-Primary h-32 mb-4"
                        required
                    ></textarea>
                    <button type="submit" className="btn bg-Primary text-white border-none hover:bg-Secondary">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
