import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    LaurierConnect
                </div>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;