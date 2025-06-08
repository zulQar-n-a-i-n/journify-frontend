import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const fixedColors = [
  "#60a5fa", // Blue
  "#4ade80", // Green
  "#f87171", // Red
  "#9ca3af", // Gray
  "#facc15", // Yellow
];

const EmotionChart = ({ data }) => {
  const [emotionEntries, setEmotionEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // EmotionChart.jsx
  useEffect(() => {
    if (data) {
      const entries = Object.entries(data).map(([emotion, percentage], index) => ({
        emotion,
        percentage,
        color: fixedColors[index % fixedColors.length],
      }));
      setEmotionEntries(entries);
    } else {
      setEmotionEntries([]);
    }
    setLoading(false);
  }, [data]);



  if (loading) return <div className="text-gray-500">Loading emotion data...</div>;
  if (emotionEntries.length === 0) return <div className="text-red-500">No emotion data available.</div>;

  return (
    <div className="space-y-6">
      {emotionEntries.map(({ emotion, percentage, color }) => (
        <div key={emotion} className="flex items-center gap-4">
          {/* Emotion label */}
          <div className="w-24 text-right text-sm font-medium capitalize text-gray-800">
            {emotion}
          </div>

          {/* Progress Bar */}
          <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: color,
              }}
            />
          </div>

          {/* Percentage */}
          <div className="w-12 text-sm text-right font-semibold text-gray-700">
            {percentage}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmotionChart;
