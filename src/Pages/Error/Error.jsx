import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div className="flex justify-center items-center h-screen">
                    <div className="text-center text-4xl font-bold space-y-5">
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <div>
                <Link to="/">                <button className="btn btn-primary text-white">Back to Home</button>
                </Link>
            </div>
        </div>
        </div>
    );
};

export default Error;