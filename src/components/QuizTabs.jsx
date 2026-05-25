export default function QuizTabs({ activeTab, onTabChange }) {
    return (
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
            <button
                onClick={() => onTabChange("listening")}
                className={`tab-btn font-bold py-3 px-6 rounded-lg shadow hover:opacity-90 focus:outline-none ${
                    activeTab === "listening"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
                🎧 Phần Nghe (Listening)
            </button>
            <button
                onClick={() => onTabChange("reading")}
                className={`tab-btn font-bold py-3 px-6 rounded-lg shadow hover:opacity-90 focus:outline-none ${
                    activeTab === "reading"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
                📖 Phần Đọc (Reading)
            </button>
        </div>
    );
}
