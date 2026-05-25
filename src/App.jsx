import { useState, useCallback } from "react";
import listeningData from "./data/listeningData.js";
import readingData from "./data/readingData.js";
import QuizTabs from "./components/QuizTabs.jsx";
import QuizQuestion from "./components/QuizQuestion.jsx";
import ResultPanel from "./components/ResultPanel.jsx";

function shuffleQuestionsAndOptions(originalQuestions) {
    const shuffled = [...originalQuestions];
    // 1. Xáo trộn thứ tự các câu hỏi
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 2. Xáo trộn các phương án A,B,C,D
    return shuffled.map((q) => {
        const optionsMap = q.options.map((opt, index) => ({
            text: opt,
            isCorrect: index === q.answer,
        }));

        for (let i = optionsMap.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsMap[i], optionsMap[j]] = [optionsMap[j], optionsMap[i]];
        }

        let newAnswerIndex = 0;
        const newOptions = optionsMap.map((item, index) => {
            if (item.isCorrect) newAnswerIndex = index;
            return item.text;
        });

        return {
            ...q,
            options: newOptions,
            answer: newAnswerIndex,
        };
    });
}

function deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
}

export default function App() {
    const [activeTab, setActiveTab] = useState("listening");
    const [shuffleEnabled, setShuffleEnabled] = useState(false);
    const [questions, setQuestions] = useState(() => deepCopy(listeningData));
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const getDataSource = useCallback(() => {
        return activeTab === "listening" ? listeningData : readingData;
    }, [activeTab]);

    const prepareQuestions = useCallback((tab, shuffle) => {
        const source = tab === "listening" ? listeningData : readingData;
        if (shuffle) {
            return shuffleQuestionsAndOptions(source);
        }
        return deepCopy(source);
    }, []);

    const handleTabChange = useCallback(
        (tab) => {
            setActiveTab(tab);
            setAnswers({});
            setSubmitted(false);
            setQuestions(prepareQuestions(tab, shuffleEnabled));
        },
        [shuffleEnabled, prepareQuestions],
    );

    const handleShuffleToggle = useCallback(() => {
        const newShuffle = !shuffleEnabled;
        setShuffleEnabled(newShuffle);
        setAnswers({});
        setSubmitted(false);
        setQuestions(prepareQuestions(activeTab, newShuffle));
    }, [shuffleEnabled, activeTab, prepareQuestions]);

    const handleSelect = useCallback(
        (qIndex, optIndex) => {
            if (submitted) return;
            setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
        },
        [submitted],
    );

    const handleSubmit = useCallback(() => {
        setSubmitted(true);
    }, []);

    const handleRetry = useCallback(() => {
        setAnswers({});
        setSubmitted(false);
        setQuestions(prepareQuestions(activeTab, shuffleEnabled));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activeTab, shuffleEnabled, prepareQuestions]);

    const score = questions.reduce((acc, q, idx) => {
        return answers[idx] === q.answer ? acc + 1 : acc;
    }, 0);

    const sectionTitle =
        activeTab === "listening"
            ? "Phần Nghe (Part 3, 4) - Câu 32 đến 100"
            : `Phần Đọc (Reading) - Tổng hợp ${readingData.length} Câu`;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
                <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
                    Trắc Nghiệm TOEIC Tổng Hợp
                </h1>

                <QuizTabs activeTab={activeTab} onTabChange={handleTabChange} />

                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-semibold text-gray-600">
                        {sectionTitle}
                    </h2>
                    <div className="mt-4 sm:mt-0 flex items-center bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 shadow-sm transition hover:bg-blue-100">
                        <input
                            type="checkbox"
                            id="shuffle-checkbox"
                            checked={shuffleEnabled}
                            onChange={handleShuffleToggle}
                            className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <label
                            htmlFor="shuffle-checkbox"
                            className="ml-2 text-sm font-bold text-blue-800 cursor-pointer"
                        >
                            Xáo trộn câu & đáp án
                        </label>
                    </div>
                </div>

                <div className="space-y-8">
                    {questions.map((q, idx) => (
                        <QuizQuestion
                            key={q.id}
                            question={q}
                            index={idx}
                            answered={submitted}
                            selectedAnswer={answers[idx]}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>

                {!submitted && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-md transition duration-300 text-lg"
                        >
                            Kiểm tra kết quả
                        </button>
                    </div>
                )}

                {submitted && (
                    <ResultPanel
                        score={score}
                        total={questions.length}
                        onRetry={handleRetry}
                    />
                )}
            </div>
        </div>
    );
}
