import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="w-[100%] bg-gray-900 text-white px-4  h-30 flex justify-between items-center bottom-0 ">
            <div>
                <p className="text-lg font-bold text-yellow-400">Employee Management System</p>
            </div>
            <div className="lg:mr-20">
                <p className="text-blue-400 font-semibold">Connect With Us !!</p>
                <div className="flex justify-center items-center gap-4 p-2">
                    <i className="fa-brands fa-twitter text-blue-400 hover:text-blue-600 text-xl"></i>
                    <i className="fa-brands fa-facebook text-blue-600 hover:text-blue-800 text-xl"></i>
                    <i className="fa-brands fa-instagram text-pink-500 hover:text-pink-700 text-xl"></i>
                </div>
            </div>
            <div>
                <i className="fa-solid fa-heart text-red-500 text-2xl"></i>
            </div>
        </footer>
    );
};

export default Footer;
