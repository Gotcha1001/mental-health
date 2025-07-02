"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { questions } from "../data/questions";

export const dynamic = "force-dynamic";

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[i], shuffled[j]];
    }
    return shuffled;
};

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [testCompleted, setTestCompleted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const isLastQuestion = currentQuestionIndex + 1 === shuffledQuestions.length;

    useEffect(() => {
        localStorage.removeItem("answeredQuestions");
        const shuffled = shuffleArray(questions);
        setShuffledQuestions(shuffled);
    }, []);

    useEffect(() => {
        if (testCompleted && shouldNavigate) {
            localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions));
            window.location.href = "/results";
        }
    }, [testCompleted, shouldNavigate, answeredQuestions]);

    const handleAnswer = () => {
        const confirmSubmit = isLastQuestion
            ? window.confirm("Are you ready to see your results?")
            : true;
        if (!confirmSubmit) return;

        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const newAnsweredQuestions = [
            ...answeredQuestions,
            {
                id: currentQuestion.id,
                type: currentQuestion.type,
                selectedOptionIndex: selectedOptionIndex ?? -1,
            },
        ];
        setAnsweredQuestions(newAnsweredQuestions);

        if (isLastQuestion) {
            setTestCompleted(true);
            setShouldNavigate(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOptionIndex(null);
        }
    };

    if (shuffledQuestions.length === 0) {
        return <div className="text-white">Loading questions...</div>;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-4"
        >
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8 text-white">
                    <span className="text-xl font-semibold">Mental Health Assessment</span>
                    <div>
                        <div className="text-sm text-purple-200">Question</div>
                        <div className="font-semibold">
                            {currentQuestionIndex + 1} of {shuffledQuestions.length}
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-purple-400 to-indigo-400 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <h2 className="text-2xl text-white mb-6">
                        {currentQuestion.text}
                    </h2>
                    <div className="grid gap-4 mb-8">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOptionIndex(index)}
                                className={`p-4 rounded-xl text-left ${selectedOptionIndex === index
                                        ? "bg-purple-600/30 border-purple-400 text-white"
                                        : "bg-white/5 text-purple-200 hover:bg-white/10"
                                    } border-2 border-transparent`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <motion.button
                            onClick={handleAnswer}
                            disabled={selectedOptionIndex === null}
                            className={`px-10 py-4 rounded-full font-semibold ${selectedOptionIndex !== null
                                    ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white"
                                    : "bg-purple-900 text-purple-400 cursor-not-allowed"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isLastQuestion ? "See Results" : "Next"}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}