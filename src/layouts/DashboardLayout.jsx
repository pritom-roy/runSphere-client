import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div>
            <div className="w-11/12 md:w-10/12 flex flex-col md:flex-row gap-2 border border-Secondary p-1 my-4 mx-auto max-w-lg rounded-lg justify-between text-center">
                <Link to="addmarathon" className="bg-Primary px-3 py-2 font-bold rounded-md hover:bg-Secondary hover:text-Primary">ADD MARATHON</Link>
                <Link to="mymarathon" className="bg-Primary px-3 py-2 font-bold rounded-md hover:bg-Secondary hover:text-Primary">MY MARATHON LIST</Link>
                <Link to="myapply" className="bg-Primary px-3 py-2 font-bold rounded-md hover:bg-Secondary hover:text-Primary">MY APPLY LIST</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default DashboardLayout;