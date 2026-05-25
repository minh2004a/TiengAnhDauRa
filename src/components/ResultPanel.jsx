export default function ResultPanel({ score, total, onRetry }) {
    return (
        <div className="mt-8 text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">
                Kết quả của bạn
            </h3>
            <p className="text-xl">
                Bạn trả lời đúng{" "}
                <span className="font-bold text-blue-700 text-3xl">
                    {score}/{total}
                </span>{" "}
                câu.
            </p>
            <button
                onClick={onRetry}
                className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >
                Làm lại phần này
            </button>
        </div>
    );
}
