// src/components/EmotionChart.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const EmotionChart = () => {
  const [emotionData, setEmotionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const response = await axiosInstance.get("/latest-emotion/");
        setEmotionData(response.data); // Expected: { desire: 62, neutral: 19, ... }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch emotion data", error);
        setLoading(false);
      }
    };

    fetchEmotionData();
  }, []);

  if (loading) return <div className="text-gray-500">Loading emotion data...</div>;
  if (!emotionData) return <div className="text-red-500">No emotion data available.</div>;

  const emotionColors = {
    desire: "#4ade80",         // green
    neutral: "#a3a3a3",        // gray
    optimism: "#60a5fa",       // blue
    annoyance: "#facc15",      // yellow
    disappointment: "#f87171", // red
  };

  return (
    <>
      <div className="space-y-6">
        {Object.entries(emotionData).map(([emotion, percentage]) => (
          <div key={emotion} className="flex items-center gap-4">
            {/* Emotion Label (Left) */}
            <div className="w-24 text-right text-sm font-medium capitalize text-gray-800">
              {emotion}
            </div>

            {/* Bar (Center) */}
            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: emotionColors[emotion] || "#ddd",
                }}
              />
            </div>

            {/* Percentage (Right) */}
            <div className="w-12 text-sm text-right font-semibold text-gray-700">
              {percentage}%
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmotionChart;
