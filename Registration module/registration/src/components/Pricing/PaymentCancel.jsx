

import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const PaymentCancel = () => {




    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                        <IoMdClose className="text-5xl  text-teal-400" />
                    </div>
                </div>
                <p className="font-semibold text-center"> Oops! Your payment didn’t go through. Don’t worry you can try again anytime. </p>

                <div className="text-center flex  gap-3 justify-center  mt-12">
                    <Link to="/Pricing"
                        className="w-auto rounded-md  bg-teal-400 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    >
                        Try Again
                    </Link>

                    <Link to="/Pricing"
                        className="w-auto rounded-md  bg-teal-400 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    >
                        Go To Dashboard
                    </Link>

                    
                </div>
                
            </div>
        </div>
    );
};

export default PaymentCancel;
