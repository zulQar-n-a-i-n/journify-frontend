import { BookOpen } from "lucide-react";


const RecommendationBox = ({ recommendation }) => {
  if (!recommendation)
    return <p className="text-gray-400">No recommendation available.</p>;

  return (
      <div className="flex items-start bg-transparent gap-3 mb-4">
        <BookOpen className="text-blue-500 mt-1" />
        <div>
          <h2 className="text-xl font-semibold">Your Personalized Recommendation</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {recommendation}
          </p>
        </div>
      </div>
  );
};

export default RecommendationBox;
