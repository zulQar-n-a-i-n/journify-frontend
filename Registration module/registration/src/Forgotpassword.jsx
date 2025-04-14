import React, { useState } from "react";
import axios from "axios";
import { MdEmail ,MdLock } from "react-icons/md";
import { FiKey } from "react-icons/fi";
import { Link , useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
     const navigate = useNavigate();
     const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;

     const validate = () => {
        let valid = true;
        let newErrors = {   email: "" };

        if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
      };
           
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return; 

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/forgot-password/", { email });

            console.log("Response:", response.data);
            // alert("Password reset link sent! Check your email.");
            navigate("/CheckEmail");
        } catch (error) {
            console.error("Error sending reset link:", error);
            alert("Failed to send reset link!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                                        <FiKey className="text-3xl text-[#8FBF7F]" />
                                    </div>
                                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="email"
                                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#8FBF7F] hover:bg-[#7BAF6F] text-white p-2 rounded-lg transition-all mt-4"
                    >
                        Send Reset Link
                    </button>
                </form>
                <div className="text-center mt-14">
                    <Link to="/Login2" className="font-semibold text-xs text-black hover:text-indigo-500">
                     Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
