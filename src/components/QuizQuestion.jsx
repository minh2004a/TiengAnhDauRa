const letters = ["A", "B", "C", "D"];

export default function QuizQuestion({
    question,
    index,
    answered,
    selectedAnswer,
    onSelect,
}) {
    return (
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                <span className="text-blue-600">Câu {index + 1}:</span>{" "}
                {question.question}
            </h3>

            <div className="space-y-2">
                {question.options.map((opt, optIndex) => {
                    const isSelected = selectedAnswer === optIndex;
                    const isCorrect = answered && optIndex === question.answer;
                    const isWrong =
                        answered && isSelected && optIndex !== question.answer;

                    let labelClasses =
                        "flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition duration-200";
                    if (isCorrect) labelClasses += " correct-answer";
                    if (isWrong) labelClasses += " wrong-answer";

                    return (
                        <label key={optIndex} className={labelClasses}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={optIndex}
                                checked={isSelected}
                                onChange={() => onSelect(index, optIndex)}
                                disabled={answered}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-gray-700">
                                <span className="font-bold mr-1">
                                    {letters[optIndex]}.
                                </span>{" "}
                                {opt}
                            </span>
                        </label>
                    );
                })}
            </div>

            {answered && (
                <div className="mt-3">
                    {selectedAnswer === undefined ? (
                        <span className="text-yellow-600 font-bold">
                            ⚠️ Bạn chưa trả lời! Đáp án đúng là{" "}
                            <b>{letters[question.answer]}</b>.
                        </span>
                    ) : selectedAnswer === question.answer ? (
                        <span className="correct-text">✅ Chính xác!</span>
                    ) : (
                        <span className="wrong-text">
                            ❌ Sai rồi! Đáp án đúng là{" "}
                            <b>{letters[question.answer]}</b>.
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
