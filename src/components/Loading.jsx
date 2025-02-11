const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[60vh] bg-white">
            <div className="text-center">
                <div className="flex justify-center items-start">
                    <span className="loading loading-spinner loading-lg text-Primary"></span>
                </div>
                <p className="mt-4 text-Primary font-semibold text-lg">
                    Please wait, loading...
                </p>
            </div>
        </div>
    );
};

export default Loading;
