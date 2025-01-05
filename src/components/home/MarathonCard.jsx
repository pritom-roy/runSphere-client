import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MarathonCard = () => {
    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        fetch('https://run-sphere-server.vercel.app/getdata')
            .then((response) => response.json())
            .then((data) => setMarathons(data))
            .catch((error) => console.error('Error fetching marathons:', error));
    }, []);

    console.log(marathons)

    return (

        <div className='w-11/12 md:w-10/12 mx-auto my-10'>
            <h1 className='text-2xl italic font-Heading text-center'>ONGOING MARATHON CAMPAIGNS</h1>
            <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-Body">
                {marathons.map((marathon) => (
                    <div
                        key={marathon._id}
                        className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition duration-200"
                    >
                        <h2 className="text-xl font-bold mb-2">{marathon.marathonTitle}</h2>
                        <p className="text-gray-700 mb-1">Location: {marathon.location}</p>
                        <p className="text-gray-700 mb-1">
                            Registration: {marathon.startRegistration} - {marathon.endRegistration}
                        </p>
                        <Link
                            to={`/details/${marathon._id}`}
                            className="mt-4 inline-block bg-Primary text-white px-4 py-2 rounded hover:bg-Secondary"
                        >
                            See Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarathonCard;
