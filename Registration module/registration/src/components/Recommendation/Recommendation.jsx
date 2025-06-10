import { BookOpen } from "lucide-react";


export const parseLinks = (recomendation) => {
    if (!recomendation) return null;
    const urlRegex = /(\bhttps?:\/\/[^\s]+|\bwww\.[^\s]+)/gi;
    const parts = recomendation.split(urlRegex);

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            const url = part.startsWith("http") ? part : `https://${part}`;
            return (
                <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-words"
                >
                    {part}
                </a>
            );
        }
        return <span key={index}>{part}</span>;
    });
};


const RecommendationBox = ({ recommendation, onClick }) => {
    if (!recommendation)
        return <p className="text-gray-400">No recommendation available.</p>;

    const previewText = recommendation?.slice(0, 100) + (recommendation?.length > 100 ? "..." : "");

    return (
        <div
            onClick={onClick}
            className="cursor-pointer flex items-start bg-transparent gap-3 mb-4 hover:bg-gray-100 p-3 rounded-lg transition"
        >
            <BookOpen className="text-blue-500 mt-1" />
            <div>
                <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {parseLinks(previewText)}
                </p>
            </div>
        </div>
    );
};

export default RecommendationBox;
