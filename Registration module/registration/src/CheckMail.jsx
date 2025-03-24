

import { MdEmail  } from "react-icons/md";

// import { Link } from "react-router-dom";

const CheckEmailpage = () => {
   

   

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                                        <MdEmail className="text-3xl text-[#8FBF7F]" />
                                    </div>
                                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Check your Email</h2>
                <p className="font-semibold">we sent a password reset link to your email.</p>
                <p className="text-center font-semibold">Open your Email app</p>
                
                <div className="text-center mt-12">
                    <a className="w-full rounded-md bg-[#8FBF7F] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#7BAF6F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBF7F]"
                         href=""> Back to Login Page</a>
                    {/* <Link to="/Login2"
                          className="w-full rounded-md bg-[#8FBF7F] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#7BAF6F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBF7F]"
                        >
                     Back to Login Page
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default CheckEmailpage;
