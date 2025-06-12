import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalProfile from '../../pages/account';
import axiosInstance from "../../api/axiosInstance";

const Dashnav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customModal, setCustomModal] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsOpen(false);
    setShowProfile(false);
    navigate('/Login2');
  };

  // report generating modal close after refresh
  useEffect(() => {
    setShowModal(false);
    setLoading(false);
    setPdfUrl(null);
  }, []);


  // report generation ky lye code
const handleGenerateReport = async () => {
  try {
    setShowModal(true);
    setLoading(true);

    const response = await axiosInstance.get('report/download/', {
      responseType: 'blob',
    });

    const contentType = response.headers['content-type'];

    if (contentType === 'application/json') {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonResponse = JSON.parse(reader.result);

          // Case 1: Free user
          if (jsonResponse.success === false) {
            setShowModal(false);
            navigate('/pricing/');
            return;
          }

          // Case 2: Premium user but less than 5 entries
          if (jsonResponse.success === true && jsonResponse.not_enough_entries) {
            setShowModal(false);
            setCustomModal({
              title: 'Not Enough Entries',
              message: 'You need at least 5 diary entries to generate a report.',
            });
            return;
          }

        } catch (e) {
          console.error('Failed to parse JSON:', e);
        }
      };
      reader.readAsText(response.data);
    }

    // Case 3: PDF success
    else if (contentType === 'application/pdf') {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setLoading(false);
      setPdfUrl(url);
    }

    // Unexpected content type
    else {
      setShowModal(false);
      setCustomModal({
        title: 'Unexpected Response',
        message: 'Something went wrong. Please try again later.',
      });
    }

  } catch (error) {
    setLoading(false);
    setShowModal(false);
    if (error.response && error.response.status === 403) {
      navigate('/pricing/');
    } else {
      console.error('Error generating report:', error);
    }
  }
};



  return (
    <>
      <nav className="flex bg-gray-200 rounded-md  py-4 items-center justify-between  relative z-10">

        <h1 className="text-2xl  pl-32  sm:text-4xl font-bold text-black transform origin-left scale-95">
          Journify
        </h1>


        <div className=" relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl font-bold mr-24 text-black px-3 py-3 rounded-lg hover:bg-yellow-100 transition"
          >
            Settings
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10 bg-transparent"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute flex justify-center right-0 mt-0 py-1  bg-white border shadow-md rounded-md w-44 z-20">
                <ul>
                  <li
                    onClick={() => {
                      setIsOpen(false);
                      setShowProfile(true); // show modal
                    }}
                    className="px-4 py-2  text-lg hover:bg-gray-200 hover:rounded-md  cursor-pointer"
                  >
                    Account
                  </li>

                  <li
                    onClick={handleGenerateReport}
                    className="px-4 py-2 text-lg hover:bg-gray-200 hover:rounded-md cursor-pointer"
                  >
                    Generate Report
                  </li>

                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 text-lg hover:bg-gray-200 hover:rounded-md cursor-pointer"
                  >
                    Logout
                  </li>


                </ul>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Modal for Profile */}
      {showProfile && (
        <PersonalProfile onClose={() => setShowProfile(false)} />
      )}

      {/* report generation modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm max-h-[90vh] overflow-auto">
            {loading ? (
              <div className="text-center text-xl font-semibold">
                <p className="animate-pulse text-blue-600">Generating report...</p>
              </div>
            ) : (
              <div>
                <iframe
                  src={pdfUrl}
                  title="Report PDF"
                  width="100%"
                  height="500px"
                  className="border rounded mb-4"
                ></iframe>
                <div className="flex justify-between">
                  <a
                    href={pdfUrl}
                    download="report.pdf"
                    onClick={() => setShowModal(false)} // close modal on download
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Download Report
                  </a>

                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}


     {/* if entries less than 5 this modal show  */}
      {customModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white flex items-center justify-center text-center p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl text-center  font-bold mb-2">{customModal.title}</h2>
            <p className="mb-4">{customModal.message}</p>
            <button
              className="bg-blue-500 text-center text-white px-4 py-2 rounded"
              onClick={() => setCustomModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}





    </>
  );
};

export default Dashnav;
