const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 text-center">
                <div className="relative">
                    <img src="/error.jpg" alt="Error" className="w-full object-cover rounded-lg shadow-xl" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-lg"></div>
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-Primary mt-6">Oops! Something Went Wrong.</h1>
                    <p className="text-lg text-Text mt-4">
                        We could not find the page you were looking for. Please try again or go back to the homepage.
                    </p>
                    <div className="mt-8">
                        <a href="/" className="btn bg-Primary hover:bg-Secondary text-white py-2 px-6 rounded-md">
                            Go to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
