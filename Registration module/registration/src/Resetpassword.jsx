import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import axios from "axios";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/reset-password/${token}/`, { password });
            

            console.log("Response:", response.data);
            alert("Password reset successful!");
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("Failed to reset password!");
        }
    };

    return (
        


        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                        <MdLock className="text-3xl text-green-500" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Reset Password</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input

                                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                id="password"
                                type="email"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-black mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="password"
                                id="confirm-password"
                                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#8FBF7F] hover:bg-[#7BAF6F] text-white p-2 rounded-lg transition-all mt-4"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/Login2" className="font-semibold text-black hover:text-indigo-500">
                     Back to login
                    </Link>
                </div>
            </div>
        </div>









    );

};

export default ResetPassword;
