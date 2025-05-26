import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Dashnav from "../components/Navbar/Dashnav.jsx";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";


const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingEntry, setEditingEntry] = useState(null);

  // const token = localStorage.getItem("token");
  // const axiosInstance = axios.create({
  //   baseURL: "http://localhost:8000/api/dashboard/", // ✅ adjust as needed
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  const fetchEntries = async () => {
    try {
      const res = await axiosInstance.get("http://127.0.0.1:8000/api/dashboard/entries/");
      setEntries(res.data);
    } catch (error) {
      console.error("Failed to load entries", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNewEntry = async (e) => {
    e.preventDefault();
    const newEntry = {
      ...form,
      date: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
    };

    try {
      const res = await axiosInstance.post("http://127.0.0.1:8000/api/dashboard/entries/", newEntry);
      setEntries([...entries, res.data]);
      setForm({ title: "", content: "" });
      setShowEntryForm(false);
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save entry", err);
      alert("Error saving entry.");
    }
  };

  const handleUpdateEntry = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`http://127.0.0.1:8000/api/dashboard/entries/${editingEntry.id}/`, form);
      setEntries(
        entries.map((entry) =>
          entry.id === editingEntry.id ? res.data : entry
        )
      );
      setEditingEntry(null);
      setForm({ title: "", content: "" });
      setShowEntryForm(false);
    } catch (err) {
      console.error("Failed to update entry", err);
      alert("Error updating entry.");
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await axiosInstance.delete(`http://127.0.0.1:8000/api/dashboard/entries/${id}/`);
      setEntries(entries.filter((entry) => entry.id !== id));
      setShowModal(false);
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

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setForm({ title: entry.title, content: entry.content });
    setShowModal(false);
    setShowEntryForm(true);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const entriesCount = getEntriesByDate(date).length;
      if (entriesCount > 0) {
        return (
          <div className="flex justify-center mt-1">
            {[...Array(Math.min(entriesCount, 3))].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-green-500 rounded-full mx-0.5" />
            ))}
            {entriesCount > 3 && <span className="text-xs">+{entriesCount - 3}</span>}
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

  return (
    <div className="min-h-screen bg-gray-200">
      <Dashnav />

      <div className="bg-gray-200 mx-auto md:px-64 py-6">
        <div className="grid md:grid-cols-2 md:grid-rows-3 gap-6">

          {/* Entry Form Card */}
          <div className="flex bg-white p-6 rounded-3xl shadow-lg h-full">
            {!showEntryForm ? (
              <button
                onClick={() => {
                  setSelectedDate(new Date());
                  setShowEntryForm(true);
                  setEditingEntry(null);
                  setForm({ title: "", content: "" });
                }}
                className="w-full h-full flex flex-col items-center justify-center group"
              >
                <div className="bg-black w-full rounded-lg">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white mb-2">
                    What's On Your Mind
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 group-hover:text-gray-600 transition">
                  <HiMiniPencilSquare className="w-16 h-16 mt-4 text-black" />
                  <p className="mt-4">Click to start writing...</p>
                </div>
              </button>
            ) : (
              <div className="fixed inset-0 backdrop-blur-sm bg-cover z-50 p-6 flex items-center justify-center">
                <div className="bg-white w-[900px] h-full rounded-2xl p-6 shadow-2xl overflow-auto scrollbar-hide">
                  <div className="flex justify-center items-center mb-6 relative">
                    <h2 className="text-xl font-bold text-black text-center w-full">
                      {editingEntry
                        ? `📖 Edit Diary Entry`
                        : `📖 Diary Entry for ${selectedDate.toDateString()}`}
                    </h2>
                    <button
                      onClick={() => setShowEntryForm(false)}
                      className="text-3xl text-gray-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>

                  <form
                    onSubmit={editingEntry ? handleUpdateEntry : handleNewEntry}
                    className="space-y-6"
                  >
                    <input
                      name="title"
                      placeholder="Title"
                      value={form.title}
                      onChange={handleInputChange}
                      className="w-full border p-4 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                    <textarea
                      name="content"
                      placeholder="Write your thoughts..."
                      value={form.content}
                      onChange={handleInputChange}
                      className="w-full border p-4 text-lg rounded-md h-[60vh] resize-none focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowEntryForm(false)}
                        className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        {editingEntry ? "Update Entry" : "Save Entry"}
                      </button>
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
            <Calendar
              onClickDay={handleDateSelect}
              tileContent={tileContent}
              tileClassName={tileClassName}
            />
          </div>

          {/* Placeholders */}
          <div className="row-span-2 bg-gray-200 p-6 rounded-3xl shadow-lg text-center border border-gray-300 ">
            <h2 className="text-xl font-bold mb-4 text-gray-500">Emotions</h2>
          </div>

          <div className="bg-gray-200 p-6 rounded-3xl shadow-lg text-center border border-gray-300 ">
            <h2 className="text-xl font-bold mb-4 text-gray-500">Recommendation</h2>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedDate && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
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
                      <p className="text-gray-700 mt-2">{entry.content}</p>
                      {isCurrentDate(selectedDate) && (
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => handleEditEntry(entry)}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-4">No entries found for this day.</p>
              )}

              {isCurrentDate(selectedDate) && (
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowEntryForm(true);
                    setEditingEntry(null);
                    setForm({ title: "", content: "" });
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  New Entry
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
