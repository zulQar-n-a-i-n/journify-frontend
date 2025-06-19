import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Dashnav from "../components/Navbar/Dashnav.jsx";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import EmotionChart from "../components/EmotionChart/EmotionChart.jsx";
import RecommendationBox, { parseLinks } from "../components/Recommendation/Recommendation.jsx";


const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [latestResult, setLatestResult] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [isSavingAndAnalyzing, setIsSavingAndAnalyzing] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [unsavedForm, setUnsavedForm] = useState({ title: "", content: "" });
  const [isReadOnlyEntry, setIsReadOnlyEntry] = useState(false);




  // emotin ky lye latest result fetch 
  const fetchLatestResult = async () => {
    try {
      const res = await axiosInstance.get("latest_result/");
      setLatestResult(res.data);
    } catch (err) {
      console.error("Failed to fetch latest result", err);
    }
  };

  const fetchEntries = async () => {
    try {
      const res = await axiosInstance.get("entries/");
      setEntries(res.data);
    } catch (error) {
      console.error("Failed to load entries", error);
    }
  };

  useEffect(() => {
    fetchLatestResult();
    fetchEntries();
  }, []);


  // recomendation ky lye
  const fetchRecommendation = async () => {
    try {
      const res = await axiosInstance.get('latest_recommendation/');
      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error("Failed to fetch recommendation", err);
    }
  };


  useEffect(() => {
    if (latestResult) {
      fetchRecommendation(); // fetch recommendation whenever emotion changes
    }
  }, [latestResult]);


  const handleInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNewEntry = async (e) => {
    e.preventDefault();
    setIsSavingAndAnalyzing(true);

    const newEntry = {
      title: form.title,
      content: form.content,
      date: new Date().toISOString().split("T")[0], // outputs "2025-06-01"
    };
    console.log("Submitting entry:", newEntry);
    try {

      const res = await axiosInstance.post("entries/", newEntry);
      setEntries([...entries, res.data]);
      setForm({ title: "", content: "" });
      setUnsavedForm({ title: "", content: "" });
      setShowEntryForm(false);
      setShowModal(false);
      await fetchLatestResult();
      await fetchRecommendation();


    } catch (err) {
      console.error("Failed to save entry", err.response?.data || err);
      alert("Error saving entry.");
    } finally {
      setIsSavingAndAnalyzing(false); // Hide modal when all done
    }

  };


  const handleClose = () => {
    if (!isReadOnlyEntry) {
      setUnsavedForm(form); // only store in New Entry mode
    }
    setShowEntryForm(false);
  };


  const handleNewEntryClick = () => {

    if (unsavedForm.title || unsavedForm.content) {
      setForm(unsavedForm);
    } else {
      setForm({ title: "", content: "" });
    }
    setIsReadOnlyEntry(false);
    setShowModal(false);
    setShowEntryForm(true);
  };


  const handleViewEntryClick = (entry) => {
    setIsReadOnlyEntry(true);
    setShowModal(false);
    setForm({ title: entry.title, content: entry.content });
    setShowEntryForm(true);
  };




  const handleDeleteEntry = async (id) => {
    try {
      await axiosInstance.delete(`entries/${id}/`);
      setEntries(entries.filter((entry) => entry.id !== id));
      setShowModal(false);

      await fetchLatestResult();
      await fetchRecommendation();

    } catch (err) {
      console.error("Failed to delete entry", err);
      alert("Error deleting entry.");
    }
  };

  const getEntriesByDate = (date) =>
    entries.filter((e) => new Date(e.date).toDateString() === date.toDateString());


  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };


  // calander ka code

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const entriesCount = getEntriesByDate(date).length;
      if (entriesCount > 0) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          </div>
        );
      }
    }
    return null;
  };


  const tileClassName = ({ date, view }) => {
    const todayStr = new Date().toDateString();
    const selectedStr = selectedDate?.toDateString();
    const currentStr = date.toDateString();

    if (view === "month") {
      if (currentStr === todayStr) return "!bg-blue-600 !text-white rounded-full";
      if (currentStr === selectedStr) return "!bg-inherit !text-white rounded-full";
    }

    if (view === "year") {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        return "!bg-blue-600 !text-white rounded-full";
      }
      if (
        selectedDate &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        return "!bg-inherit rounded-full";
      }
    }

    if (view === "decade") {
      const now = new Date();
      const currentYear = now.getFullYear();
      if (date.getFullYear() === currentYear) {
        return "!bg-blue-600 !text-white rounded-full";
      }
    }

    if (view === "century") {
      const now = new Date();
      const currentDecade = Math.floor(now.getFullYear() / 10);
      const tileDecade = Math.floor(date.getFullYear() / 10);
      if (tileDecade === currentDecade) {
        return "!bg-blue-600 !text-white rounded-full";
      }
    }

    return "rounded-full hover:!bg-[#fef9c3] hover:text-black";
  };

  const isCurrentDate = (date) => {
    return new Date().toDateString() === date.toDateString();
  };




  // return jsx

  return (
    <div className="min-h-screen bg-gray-200">
      <Dashnav />

      <div className="bg-gray-200 mx-auto md:px-64 pt-4 pb-6">
        <div className="grid md:grid-cols-2 md:grid-rows-3 gap-6">

          {/* Entry Form Card */}
          <div className="flex bg-white p-6 rounded-3xl shadow-lg h-full">
            {!showEntryForm ? (
              <button
                onClick={handleNewEntryClick}

                className="w-full h-full flex flex-col items-center justify-center group"
              >
                <div className="bg-black w-1/2 rounded-xl">
                  <h2 className="text-2xl font-bold pt-1 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white mb-2">
                    What's On Your Mind
                  </h2>
                </div>
                <div className="flex flex-wrap justify-center items-center text-gray-500 group-hover:text-gray-600 transition">
                  <HiMiniPencilSquare className="w-16 h-16 mt-4 text-black" />
                  <p className="mt-4">Click to start writing...</p>
                </div>
              </button>
            ) : (
              <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-40 z-50 p-6 flex items-center justify-center"
                 onClick={handleClose}>

                <div className="bg-white w-[900px] h-full rounded-2xl p-6 shadow-2xl overflow-auto scrollbar-hide"
                  onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center items-center mb-6 relative">
                    <h2 className="text-xl font-bold text-black text-center w-full">
                      📖 Diary Entry for {selectedDate ? selectedDate.toDateString() : "Unknown Date"}
                    </h2>


                    <button
                       onClick={handleClose}
                      className="text-3xl text-gray-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>

                  <form
                    onSubmit={isReadOnlyEntry ? (e) => e.preventDefault() : handleNewEntry}
                    className="space-y-6">


                    <input
                      name="title"
                      placeholder="Title"
                      value={form.title}
                      readOnly={isReadOnlyEntry}
                      onChange={handleInputChange}
                      className="w-full border p-4 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                    <textarea
                      name="content"
                      placeholder="Write your thoughts..."
                      value={form.content}
                      readOnly={isReadOnlyEntry}
                      onChange={handleInputChange}
                      className="w-full border p-4 text-lg rounded-md h-[60vh] resize-none focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                    <div className="flex justify-end space-x-4">
                      {isReadOnlyEntry ? (
                        <button
                          type="button"
                          onClick={() => {
                            setShowEntryForm(false);
                          }}
                          className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
                        >
                          Close
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              // Save unsaved form draft if needed
                              if (form.title || form.content) {
                                setUnsavedForm(form);
                              } else {
                                setUnsavedForm({ title: "", content: "" });
                              }
                              setShowEntryForm(false);
                            }}
                            className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Save Entry
                          </button>
                        </>
                      )}
                    </div>

                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="row-span-2 bg-gradient-to-br from-black to-[#07000e] p-6 rounded-3xl text-center shadow-xl border border-purple-500/30 backdrop-blur-sm bg-white/10 [&_.react-calendar]:w-full [&_.react-calendar]:bg-transparent [&_.react-calendar]:text-yellow-600 [&_.react-calendar__navigation]:mb-4 [&_.react-calendar__navigation]:flex [&_.react-calendar__navigation]:justify-between [&_.react-calendar__tile]:rounded-xl [&_.react-calendar__tile]:p-3 [&_.react-calendar__tile]:transition [&_.react-calendar]:border-none [&_.react-calendar__navigation button:hover]:bg-transparent">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-white drop-shadow-md">
              My Calendar
            </h2>
            <div className="w-full overflow-hidden">
              <Calendar
                onClickDay={handleDateSelect}
                tileContent={tileContent}
                tileClassName={tileClassName}
              />
            </div>
          </div>

          {/* Placeholders */}
          <div className="row-span-2 bg-white p-6 rounded-3xl shadow-lg text-center border border-gray-300 ">
            <h2 className="text-2xl font-bold mb-14 text-gray-500">Emotions</h2>
            <EmotionChart data={latestResult} />
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg text-center border border-gray-300 hover:bg-gray-200">
            <h2 className="text-xl font-bold mb-3 text-gray-500">Recommendation</h2>
            <RecommendationBox
              recommendation={recommendation}
              onClick={() => setShowRecommendationModal(true)}
            />
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedDate && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center"
            onClick={() => setShowModal(false)} >

            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {

                  setShowModal(false);
                }}
                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-2">
                📖 Entries for {selectedDate.toDateString()}
              </h2>

              {getEntriesByDate(selectedDate).length > 0 ? (
                <div className="mb-4 max-h-64 overflow-y-auto">
                  {getEntriesByDate(selectedDate).map((entry) => (
                    <div key={entry.id} className="mb-4 p-3 border rounded-lg">
                      <h3 className="font-semibold">{entry.title}</h3>

                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleViewEntryClick(entry)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Open
                        </button>


                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-4">No entries found for this day.</p>
              )}

              {isCurrentDate(selectedDate) && (
                <button
                  onClick={handleNewEntryClick}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  New Entry
                </button>
              )}

            </div>
          </div>
        )}


        {/* recommendatin modal */}

        {showRecommendationModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center"
            onClick={() => setShowRecommendationModal(false)}
          >
            <div
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowRecommendationModal(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">📘  Recommendation</h2>
              <p className="text-gray-800 whitespace-pre-line">
                {parseLinks(recommendation)}  </p>
            </div>
          </div>
        )}



        {/* after saving modal show when recommendation fetch modal close */}
        {isSavingAndAnalyzing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50">
            <div className="text-center text-xl font-semibold">
              <p className="animate-pulse text-blue-600">Saving and Analyzing Diary Entry...</p>
            </div>
          </div>

        )}

      </div>
    </div>
  );
};

export default Dashboard;



