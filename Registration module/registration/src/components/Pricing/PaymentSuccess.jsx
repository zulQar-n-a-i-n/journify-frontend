import { useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { GrFormCheckmark } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

useEffect(() => {
  const confirmPayment = async () => {
    const session_id = searchParams.get("session_id");
    const token = localStorage.getItem("access");

    if (session_id && token) {
      try {
        await axios.get(
          `http://127.0.0.1:8000/payment/confirm-payment/?session_id=${session_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error confirming payment:", error);
      }
    }
  };

  confirmPayment();
}, [searchParams]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
            <GrFormCheckmark className="text-5xl text-teal-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Payment Successfully</h2>
        <p className="font-semibold text-center">You have successfully upgraded to the Premium plan.</p>

        <div className="text-center mt-12">
          <Link to="/Dashboard" className="w-full rounded-md bg-teal-400 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-300">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
