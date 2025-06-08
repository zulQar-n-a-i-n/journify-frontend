import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const fixedColors = [
  "#60a5fa", // Blue
  "#4ade80", // Green
  "#f87171", // Red
  "#9ca3af", // Gray
  "#facc15", // Yellow
];

const EmotionChart = () => {
  const [emotionEntries, setEmotionEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const response = await axiosInstance.get("/latest_result/");
        const data = response.data; // e.g. { "desire": 50, "joy": 30, ... }

        // Convert object to array and keep the order as received
        const entries = Object.entries(data).map(([emotion, percentage], index) => ({
          emotion,
          percentage,
          color: fixedColors[index % fixedColors.length], // Assign color based on order
        }));

        setEmotionEntries(entries);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch emotion data", error);
        setLoading(false);
      }
    };

    fetchEmotionData();
  }, []);

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
          <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative">
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
