import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalProfile from '../../pages/account';

const Dashnav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsOpen(false);
    setShowProfile(false);
    navigate('/Login2');
  };


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
        // Check if response is literally "false"
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          if (text === 'false') {
            setShowModal(false);
            navigate('/price/');
          }
        };
        reader.readAsText(response.data);
      } else if (contentType === 'application/pdf') {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Delay 10 seconds before showing the PDF
        setTimeout(() => {
          setLoading(false);
          setPdfUrl(url);
        }, 10000);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      navigate('/price/');
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
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




    </>
  );
};

export default Dashnav;
