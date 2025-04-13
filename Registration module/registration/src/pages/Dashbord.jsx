// import React, { useState } from 'react';

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function Dasboard() {
//   // States for new entry
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [date, setDate] = useState(new Date());

//   // States for calendar selection
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   // Handle new entry form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // For now, log the entry (You can connect this to the backend later)
//     console.log({ title, content, date });
//     // Reset form
//     setTitle('');
//     setContent('');
//   };

//   return (
//     <div className="flex flex-col md:flex-row w-full h-screen p-4">
//       {/* New Entry Form */}
//       <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-lg space-y-4">
//         <h2 className="text-2xl font-semibold text-center">New Diary Entry</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Title (optional)"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//           <textarea
//             placeholder="Write your thoughts..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded h-32"
//           />
//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-500 text-white rounded"
//           >
//             Save Entry
//           </button>
//         </form>
//       </div>

//       {/* Calendar View */}
//       <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-lg space-y-4">
//         <h2 className="text-2xl font-semibold text-center">Calendar View</h2>
//         <Calendar
//           onChange={setSelectedDate}
//           value={selectedDate}
//           tileClassName={({ date }) => {
//             // Highlight dates (For now, mock data: highlight weekends)
//             if (date.getDay() === 0 || date.getDay() === 6) {
//               return 'bg-yellow-200';
//             }
//           }}
//         />
//         <div className="mt-4 text-center">
//           <h3 className="text-xl">Selected Date: {selectedDate.toDateString()}</h3>
//           <p>View Entry for {selectedDate.toDateString()}</p>
//           {/* Add code here to fetch the entry for the selected date */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dasboard;








// import React from 'react';

// const Dashboard = () => {
//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold">Sales statistics</h1>
//                 <p className="text-gray-500">Updated 1 days ago</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* First Section - Monthly Stats */}
//                 <div className="bg-white rounded-lg shadow p-6">


//                 </div>

//                 {/* Second Section - Recent Transactions */}
//                 <div className="bg-white rounded-lg shadow p-6">

//                 </div>

//                 {/* Third Section - Market Forecast */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="font-semibold mb-4">Market forecast</h2>
//                     <div className="space-y-3">
//                         <div className="flex justify-between">
//                             <span>2023</span>
//                             <span className="font-medium">Explosive growth of DeFi</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>2024</span>
//                             <span className="font-medium">Mainstream adoption of CBDCs</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>2025</span>
//                             <span className="font-medium">1 BTC reaches $500K</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>2027</span>
//                             <span className="font-medium">Widespread retail use</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Fourth Section - BTC Stats */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex justify-between items-start mb-4">
//                         <div>
//                             <h2 className="font-semibold">BTC price</h2>
//                             <p className="text-2xl font-bold">21,105$</p>
//                         </div>
//                         <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
//                             <span>+28.21%</span>
//                         </div>
//                     </div>
//                     <div>
//                         <p className="text-gray-500">Market cap forecast</p>
//                         <p className="text-xl font-semibold">1,3trln$</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// import Navbar from "../components/Navbar/Navbar.jsx"





import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../components/Navbar/Navbar.jsx";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingEntry, setEditingEntry] = useState(null);

  const handleInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNewEntry = (e) => {
    e.preventDefault();
    const newEntry = {
      ...form,
      date: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
      id: Date.now(),
    };
    setEntries([...entries, newEntry]);
    setForm({ title: "", content: "" });
    setShowEntryForm(false);
    setShowModal(false);
  };

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    setEntries(
      entries.map((entry) =>
        entry.id === editingEntry.id ? { ...form, id: entry.id, date: entry.date } : entry
      )
    );
    setEditingEntry(null);
    setForm({ title: "", content: "" });
    setShowEntryForm(false);
  };

  const getEntriesByDate = (date) =>
    entries.filter((e) => new Date(e.date).toDateString() === date.toDateString());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateEntries = getEntriesByDate(date);
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
      if (currentStr === todayStr)
        return "bg-yellow-300 text-black rounded-full";
      if (currentStr === selectedStr)
        return "bg-blue-400 text-white rounded-full";
    }
    return "";
  };

  const isCurrentDate = (date) => {
    return new Date().toDateString() === date.toDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Entry Form Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-[180px]">
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
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
                  Create New Entry
                </h2>
                <p className="text-gray-500 group-hover:text-gray-600 transition">
                  Click to start writing...
                </p>
              </button>
            ) : (
              <div className="fixed inset-0 bg-[url('bg1.jpg')] bg-cover z-50 p-6 flex items-center justify-center">
                <div className="bg-white w-[900px] h-full rounded-none p-6 shadow-2xl overflow-auto">
                  <div className="flex justify-center items-center mb-6 relative">
                    <h2 className="text-3xl font-bold text-orange-300 text-center w-full">
                      {editingEntry
                        ? `Edit Diary Entry`
                        : `New Diary Entry for ${selectedDate.toDateString()}`}
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
                      className="w-full border p-4 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <textarea
                      name="content"
                      placeholder="Write your thoughts..."
                      value={form.content}
                      onChange={handleInputChange}
                      className="w-full border p-4 text-lg rounded-md h-[60vh] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          {/* Calendar Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">📅 Your Mood Calendar</h2>
            <Calendar
              onClickDay={handleDateSelect}
              tileContent={tileContent}
              tileClassName={tileClassName}
              className="rounded-xl mx-auto"
            />
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedDate && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
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
                        <button
                          onClick={() => handleEditEntry(entry)}
                          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
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
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
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