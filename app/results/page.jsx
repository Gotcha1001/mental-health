// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { questions } from "../data/questions";
// import jsPDF from "jspdf";

// export const dynamic = "force-dynamic";

// const calculateScores = (answeredQuestions) => {
//     const conditionScores = {
//         ADHD: 0,
//         Autism: 0,
//         Anxiety: 0,
//         Depression: 0,
//     };
//     const questionsPerCondition = questions.reduce((acc, q) => {
//         acc[q.type] = (acc[q.type] || 0) + 1;
//         return acc;
//     }, {});

//     answeredQuestions.forEach((answer) => {
//         const question = questions.find((q) => q.id === answer.id);
//         if (question) {
//             const score = answer.selectedOptionIndex + 1; // 1 to 5
//             conditionScores[question.type] += score;
//         }
//     });

//     Object.keys(conditionScores).forEach((condition) => {
//         const maxScore = questionsPerCondition[condition] * 5;
//         conditionScores[condition] = Math.round((conditionScores[condition] / maxScore) * 100);
//     });

//     const likelihoods = {};
//     Object.keys(conditionScores).forEach((condition) => {
//         const score = conditionScores[condition];
//         if (score >= 75) likelihoods[condition] = "High";
//         else if (score >= 50) likelihoods[condition] = "Moderate";
//         else likelihoods[condition] = "Low";
//     });

//     console.log("Condition Scores:", conditionScores);
//     console.log("Likelihoods:", likelihoods);
//     return { conditionScores, likelihoods };
// };

// const getTopCondition = (conditionScores) => {
//     return Object.entries(conditionScores)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, 1)
//         .map(([condition]) => condition)[0];
// };

// async function fetchConditionAdvice(conditionScores, likelihoods, topCondition) {
//     try {
//         const response = await fetch("/api/condition-advice", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ conditionScores, likelihoods, topCondition }),
//         });
//         if (!response.ok) {
//             throw new Error(`Failed to fetch advice: ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log("Fetched advice:", data.advice);
//         return data.advice;
//     } catch (error) {
//         console.error("Error fetching advice:", error);
//         throw error;
//     }
// }

// const generatePDFReport = (conditionScores, likelihoods, topCondition, advice) => {
//     const doc = new jsPDF();
//     const pageHeight = 780;
//     const margin = 20;

//     const primaryColor = "#6B46C1";
//     const textColor = "#000000";
//     const separatorColor = "#4C51BF";
//     const backgroundColor = "#F3E8FF";

//     doc.setFillColor(backgroundColor);
//     doc.rect(0, 0, 210, 297, "F");

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     doc.setTextColor(primaryColor);
//     doc.text("Mental Health Assessment Report", 105, margin, { align: "center" });

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(textColor);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, margin + 10, { align: "center" });

//     let y = margin + 25;

//     const checkPage = (requiredHeight) => {
//         if (y + requiredHeight > pageHeight) {
//             doc.addPage();
//             doc.setFillColor(backgroundColor);
//             doc.rect(0, 0, 210, 297, "F");
//             y = margin;
//         }
//     };

//     checkPage(60);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(primaryColor);
//     doc.text("Your Condition Likelihoods", margin, y);
//     y += 10;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(textColor);
//     Object.entries(conditionScores).forEach(([condition, score]) => {
//         doc.text(`${condition}: ${score}% (${likelihoods[condition]})`, margin + 5, y);
//         y += 8;
//     });

//     y += 5;
//     doc.setDrawColor(separatorColor);
//     doc.setLineWidth(0.5);
//     doc.line(margin, y, 190, y);
//     y += 6;

//     doc.addPage();
//     doc.setFillColor(backgroundColor);
//     doc.rect(0, 0, 210, 297, "F");
//     y = margin;

//     const sanitizeText = (text) => {
//         return (text || "Not available.")
//             .replace(/\n+/g, " ")
//             .replace(/\s+/g, " ")
//             .replace(/\*\*/g, "")
//             .trim();
//     };

//     const topConditionText = sanitizeText(advice.topConditionExplanation);
//     const topConditionLines = doc.splitTextToSize(topConditionText, 170);
//     const topConditionHeight = topConditionLines.length * 7 + 20;
//     checkPage(topConditionHeight);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(primaryColor);
//     doc.text(`About ${topCondition}`, margin, y);
//     y += 10;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(textColor);
//     topConditionLines.forEach((line) => {
//         doc.text(line, margin + 5, y);
//         y += 7;
//     });

//     y += 5;
//     doc.setDrawColor(separatorColor);
//     doc.setLineWidth(0.5);
//     doc.line(margin, y, 190, y);
//     y += 6;

//     const adviceText = sanitizeText(advice.conditionAdvice);
//     const adviceLines = doc.splitTextToSize(adviceText, 170);
//     const adviceHeight = adviceLines.length * 7 + 20;
//     checkPage(adviceHeight);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(primaryColor);
//     doc.text("Support and Next Steps", margin, y);
//     y += 10;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(textColor);
//     adviceLines.forEach((line) => {
//         doc.text(line, margin + 5, y);
//         y += 7;
//     });

//     y += 5;
//     doc.setDrawColor(separatorColor);
//     doc.setLineWidth(0.5);
//     doc.line(margin, y, 190, y);
//     y += 6;

//     checkPage(30);
//     doc.setFont("helvetica", "italic");
//     doc.setFontSize(10);
//     doc.setTextColor("#666666");
//     doc.text(
//         "Disclaimer: This assessment is for informational purposes only and is not a substitute for professional medical diagnosis or treatment.",
//         margin,
//         y,
//         { maxWidth: 170 }
//     );

//     doc.save("Mental_Health_Assessment_Report.pdf");
// };

// export default function ResultsPage() {
//     const [answeredQuestions, setAnsweredQuestions] = useState([]);
//     const [advice, setAdvice] = useState({
//         topConditionExplanation: "",
//         conditionAdvice: "",
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [retryCount, setRetryCount] = useState(0);
//     const [dataLoading, setDataLoading] = useState(true);

//     useEffect(() => {
//         const storedAnswers = JSON.parse(localStorage.getItem("answeredQuestions") || "[]");
//         const storedAdvice = JSON.parse(localStorage.getItem("conditionAdvice") || "{}");
//         setAnsweredQuestions(storedAnswers);
//         setAdvice(storedAdvice);
//         setDataLoading(false);
//         if (storedAdvice.topConditionExplanation && storedAdvice.conditionAdvice) {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         if (!dataLoading && answeredQuestions.length && !advice.topConditionExplanation && !advice.conditionAdvice) {
//             const { conditionScores, likelihoods } = calculateScores(answeredQuestions);
//             const topCondition = getTopCondition(conditionScores);
//             setIsLoading(true);
//             fetchConditionAdvice(conditionScores, likelihoods, topCondition)
//                 .then((fetchedAdvice) => {
//                     setAdvice(fetchedAdvice);
//                     localStorage.setItem("conditionAdvice", JSON.stringify(fetchedAdvice));
//                     setIsLoading(false);
//                     setError(null);
//                 })
//                 .catch((err) => {
//                     setError(err.message);
//                     setIsLoading(false);
//                 });
//         } else if (!dataLoading && !answeredQuestions.length) {
//             setIsLoading(false);
//         }
//     }, [answeredQuestions, retryCount, dataLoading]);

//     const handleRetry = () => {
//         setRetryCount((prev) => prev + 1);
//         setError(null);
//         setIsLoading(true);
//         localStorage.clear();
//     };

//     const handleDownloadPDF = () => {
//         const { conditionScores, likelihoods } = calculateScores(answeredQuestions);
//         const topCondition = getTopCondition(conditionScores);
//         generatePDFReport(conditionScores, likelihoods, topCondition, advice);
//     };

//     if (dataLoading) {
//         return (
//             <div className="min-h-screen bg-purple-950 flex items-center justify-center text-white">
//                 <div className="text-center">
//                     <p className="text-purple-200 mb-4">Loading...</p>
//                     <motion.div
//                         className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     if (!answeredQuestions.length) {
//         return (
//             <div className="min-h-screen bg-purple-950 flex items-center justify-center text-white">
//                 <div className="text-center">
//                     <p className="text-pink-400 mb-4">No results available. Please take the assessment first.</p>
//                     <Link href="/" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
//                         Take Assessment
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     const { conditionScores, likelihoods } = calculateScores(answeredQuestions);
//     const topCondition = getTopCondition(conditionScores);

//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-4"
//         >
//             <div className="max-w-4xl mx-auto text-white">
//                 <h1 className="text-3xl font-bold text-center mb-6">Your Assessment Results</h1>
//                 {isLoading && (
//                     <div className="text-center text-purple-200 mb-6">
//                         Loading your personalized advice...
//                         <motion.div
//                             className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin ml-2"
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         />
//                     </div>
//                 )}
//                 {error && (
//                     <div className="text-center text-pink-400 mb-6">
//                         {error.includes("429") || error.includes("quota")
//                             ? "We've hit a temporary limit. Please try again in a moment."
//                             : error}
//                         <motion.button
//                             onClick={handleRetry}
//                             className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Retry
//                         </motion.button>
//                     </div>
//                 )}
//                 <div className="bg-white/10 rounded-2xl p-6 mb-6">
//                     <h2 className="text-xl font-semibold mb-4 text-purple-400">
//                         Your Condition Likelihoods
//                     </h2>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         {Object.entries(conditionScores).map(([condition, score]) => (
//                             <div key={condition} className="bg-white/5 rounded-lg p-3">
//                                 <h3 className="text-lg font-medium capitalize text-indigo-200">
//                                     {condition}
//                                 </h3>
//                                 <p className="text-sm text-purple-200">
//                                     Score: {score}% ({likelihoods[condition]})
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {advice.topConditionExplanation && (
//                     <div className="bg-white/10 rounded-2xl p-6 mb-6">
//                         <h2 className="text-xl font-semibold mb-4 text-purple-400">
//                             About {topCondition}
//                         </h2>
//                         <p className="text-purple-200 leading-relaxed">{advice.topConditionExplanation}</p>
//                     </div>
//                 )}
//                 {advice.conditionAdvice && (
//                     <div className="bg-white/10 rounded-2xl p-6 mb-6">
//                         <h2 className="text-xl font-semibold mb-4 text-purple-400">
//                             Support and Next Steps
//                         </h2>
//                         <p className="text-purple-200 leading-relaxed">{advice.conditionAdvice}</p>
//                     </div>
//                 )}
//                 <div className="bg-white/10 rounded-2xl p-6 mb-6 text-sm text-purple-300 italic">
//                     Disclaimer: This assessment is for informational purposes only and should not replace professional medical diagnosis or treatment.
//                 </div>
//                 <div className="flex justify-center gap-4">
//                     <motion.button
//                         onClick={handleDownloadPDF}
//                         className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full font-medium"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         Download Report
//                     </motion.button>
//                     <Link href="/">
//                         <motion.div
//                             className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Retake Assessment
//                         </motion.div>
//                     </Link>
//                 </div>
//             </div>
//         </motion.div>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { questions } from "../data/questions";
import jsPDF from "jspdf";

export const dynamic = "force-dynamic";

const calculateScores = (answeredQuestions) => {
    const scores = { ADHD: 0, Autism: 0, Anxiety: 0, Depression: 0 };
    answeredQuestions.forEach((answer) => {
        const question = questions.find((q) => q.id === answer.id);
        if (question) {
            let score = 0;
            if (question.type === "ADHD") {
                score = ["Never", "Rarely", "Sometimes", "Often", "Very Often"].indexOf(answer.selectedOption);
            } else if (question.type === "Autism") {
                // Scoring: Definitely agree/Slightly agree = 1 for items 7,9,15,16 (reversed); Definitely disagree/Slightly disagree = 1 for others
                const reversedItems = [7, 9, 15, 16];
                const isReversed = reversedItems.includes(question.id);
                const options = ["Definitely agree", "Slightly agree", "Slightly disagree", "Definitely disagree"];
                score = options.indexOf(answer.selectedOption);
                score = isReversed ? (score < 2 ? 0 : 1) : (score < 2 ? 1 : 0);
            } else {
                score = ["Not at all", "Several days", "More than half the days", "Nearly every day"].indexOf(answer.selectedOption);
            }
            scores[question.type] += score;
        }
    });

    const likelihoods = {};
    likelihoods.Depression = scores.Depression >= 20 ? "Severe" :
        scores.Depression >= 15 ? "Moderately Severe" :
            scores.Depression >= 10 ? "Moderate" :
                scores.Depression >= 5 ? "Mild" : "Minimal";
    likelihoods.Anxiety = scores.Anxiety >= 15 ? "Severe" :
        scores.Anxiety >= 10 ? "Moderate" :
            scores.Anxiety >= 5 ? "Mild" : "Minimal";
    likelihoods.ADHD = scores.ADHD >= 17 ? "High Likelihood" :
        scores.ADHD >= 14 ? "Moderate Likelihood" : "Low Likelihood";
    likelihoods.Autism = scores.Autism >= 7 ? "High Likelihood" :
        scores.Autism >= 5 ? "Moderate Likelihood" : "Low Likelihood";

    return { scores, likelihoods };
};

const getTopCondition = (scores) => {
    return Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 1)
        .map(([condition]) => condition)[0];
};

async function fetchConditionAdvice(scores, likelihoods, topCondition) {
    try {
        const response = await fetch("/api/condition-advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scores, likelihoods, topCondition }),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch advice: ${response.statusText}`);
        }
        const data = await response.json();
        return data.advice;
    } catch (error) {
        console.error("Error fetching advice:", error);
        throw error;
    }
}

const generatePDFReport = (scores, likelihoods, topCondition, advice) => {
    const doc = new jsPDF();
    const pageHeight = 780;
    const margin = 20;

    const primaryColor = "#6B46C1";
    const textColor = "#000000";
    const separatorColor = "#4C51BF";
    const backgroundColor = "#F3E8FF";

    doc.setFillColor(backgroundColor);
    doc.rect(0, 0, 210, 297, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(primaryColor);
    doc.text("Mental Health Screening Report", 105, margin, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, margin + 10, { align: "center" });

    let y = margin + 25;

    const checkPage = (requiredHeight) => {
        if (y + requiredHeight > pageHeight) {
            doc.addPage();
            doc.setFillColor(backgroundColor);
            doc.rect(0, 0, 210, 297, "F");
            y = margin;
        }
    };

    checkPage(60);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text("Your Screening Results", margin, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    Object.entries(scores).forEach(([condition, score]) => {
        const maxScores = { ADHD: 24, Autism: 10, Anxiety: 21, Depression: 27 };
        doc.text(`${condition}: Score ${score}/${maxScores[condition]} (${likelihoods[condition]})`, margin + 5, y);
        y += 8;
    });

    y += 5;
    doc.setDrawColor(separatorColor);
    doc.setLineWidth(0.5);
    doc.line(margin, y, 190, y);
    y += 6;

    doc.addPage();
    doc.setFillColor(backgroundColor);
    doc.rect(0, 0, 210, 297, "F");
    y = margin;

    const sanitizeText = (text) => {
        return (text || "Not available.")
            .replace(/\n+/g, " ")
            .replace(/\s+/g, " ")
            .replace(/\*\*/g, "")
            .trim();
    };

    const topConditionText = sanitizeText(advice.topConditionExplanation);
    const topConditionLines = doc.splitTextToSize(topConditionText, 170);
    const topConditionHeight = topConditionLines.length * 7 + 20;
    checkPage(topConditionHeight);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text(`About ${topCondition}`, margin, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    topConditionLines.forEach((line) => {
        doc.text(line, margin + 5, y);
        y += 7;
    });

    y += 5;
    doc.setDrawColor(separatorColor);
    doc.setLineWidth(0.5);
    doc.line(margin, y, 190, y);
    y += 6;

    const adviceText = sanitizeText(advice.conditionAdvice);
    const adviceLines = doc.splitTextToSize(adviceText, 170);
    const adviceHeight = adviceLines.length * 7 + 20;
    checkPage(adviceHeight);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text("Support and Next Steps", margin, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    adviceLines.forEach((line) => {
        doc.text(line, margin + 5, y);
        y += 7;
    });

    y += 5;
    doc.setDrawColor(separatorColor);
    doc.setLineWidth(0.5);
    doc.line(margin, y, 190, y);
    y += 6;

    checkPage(30);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor("#666666");
    doc.text(
        "Disclaimer: This screening is for informational purposes only and uses validated tools (PHQ-9, GAD-7, ASRS, AQ-10). It is not a substitute for professional medical diagnosis or treatment. Consult a licensed professional for a full evaluation.",
        margin,
        y,
        { maxWidth: 170 }
    );

    doc.save("Mental_Health_Screening_Report.pdf");
};

export default function ResultsPage() {
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [advice, setAdvice] = useState({
        topConditionExplanation: "",
        conditionAdvice: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem("answeredQuestions") || "[]");
        const storedAdvice = JSON.parse(localStorage.getItem("conditionAdvice") || "{}");
        setAnsweredQuestions(storedAnswers);
        setAdvice(storedAdvice);
        setDataLoading(false);
        if (storedAdvice.topConditionExplanation && storedAdvice.conditionAdvice) {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!dataLoading && answeredQuestions.length && !advice.topConditionExplanation && !advice.conditionAdvice) {
            const { scores, likelihoods } = calculateScores(answeredQuestions);
            const topCondition = getTopCondition(scores);
            setIsLoading(true);
            fetchConditionAdvice(scores, likelihoods, topCondition)
                .then((fetchedAdvice) => {
                    setAdvice(fetchedAdvice);
                    localStorage.setItem("conditionAdvice", JSON.stringify(fetchedAdvice));
                    setIsLoading(false);
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsLoading(false);
                });
        } else if (!dataLoading && !answeredQuestions.length) {
            setIsLoading(false);
        }
    }, [answeredQuestions, retryCount, dataLoading]);

    const handleRetry = () => {
        setRetryCount((prev) => prev + 1);
        setError(null);
        setIsLoading(true);
        localStorage.clear();
    };

    const handleDownloadPDF = () => {
        const { scores, likelihoods } = calculateScores(answeredQuestions);
        const topCondition = getTopCondition(scores);
        generatePDFReport(scores, likelihoods, topCondition, advice);
    };

    const handleShareWithProvider = () => {
        const { scores, likelihoods } = calculateScores(answeredQuestions);
        const text = `Mental Health Screening Results:\n${Object.entries(scores).map(([condition, score]) => {
            const maxScores = { ADHD: 24, Autism: 10, Anxiety: 21, Depression: 27 };
            return `${condition}: Score ${score}/${maxScores[condition]} (${likelihoods[condition]})`;
        }).join("\n")}\n\nPlease consult a professional for a full evaluation.`;
        if (navigator.share) {
            navigator.share({ text });
        } else {
            alert("Sharing is not supported on this device. Please copy the results manually.");
        }
    };

    if (dataLoading) {
        return (
            <div className="min-h-screen bg-purple-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-purple-200 mb-4">Loading...</p>
                    <motion.div
                        className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>
        );
    }

    if (!answeredQuestions.length) {
        return (
            <div className="min-h-screen bg-purple-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-pink-400 mb-4">No results available. Please take the screening first.</p>
                    <Link href="/" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
                        Take Screening
                    </Link>
                </div>
            </div>
        );
    }

    const { scores, likelihoods } = calculateScores(answeredQuestions);
    const topCondition = getTopCondition(scores);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-4"
        >
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-3xl font-bold text-center mb-6">Your Screening Results</h1>
                {isLoading && (
                    <div className="text-center text-purple-200 mb-6">
                        Loading your personalized advice...
                        <motion.div
                            className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin ml-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                )}
                {error && (
                    <div className="text-center text-pink-400 mb-6">
                        {error.includes("429") || error.includes("quota")
                            ? "We've hit a temporary limit. Please try again in a moment."
                            : error}
                        <motion.button
                            onClick={handleRetry}
                            className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Retry
                        </motion.button>
                    </div>
                )}
                <div className="bg-white/10 rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-purple-400">
                        Your Condition Likelihoods
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(scores).map(([condition, score]) => {
                            const maxScores = { ADHD: 24, Autism: 10, Anxiety: 21, Depression: 27 };
                            return (
                                <div key={condition} className="bg-white/5 rounded-lg p-3">
                                    <h3 className="text-lg font-medium capitalize text-indigo-200">
                                        {condition}
                                    </h3>
                                    <p className="text-sm text-purple-200">
                                        Score: {score}/{maxScores[condition]} ({likelihoods[condition]})
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {advice.topConditionExplanation && (
                    <div className="bg-white/10 rounded-2xl p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">
                            About {topCondition}
                        </h2>
                        <p className="text-purple-200 leading-relaxed">{advice.topConditionExplanation}</p>
                    </div>
                )}
                {advice.conditionAdvice && (
                    <div className="bg-white/10 rounded-2xl p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">
                            Support and Next Steps
                        </h2>
                        <p className="text-purple-200 leading-relaxed">{advice.conditionAdvice}</p>
                    </div>
                )}
                <div className="bg-white/10 rounded-2xl p-6 mb-6 text-sm text-purple-300 italic">
                    Disclaimer: This screening uses validated tools (PHQ-9, GAD-7, ASRS, AQ-10) for informational purposes only and is not a substitute for professional medical diagnosis or treatment. Consult a licensed professional for a full evaluation.
                </div>
                <div className="flex justify-center gap-4">
                    <motion.button
                        onClick={handleDownloadPDF}
                        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Download Report
                    </motion.button>
                    <motion.button
                        onClick={handleShareWithProvider}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Share with Provider
                    </motion.button>
                    <Link href="/">
                        <motion.div
                            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Retake Screening
                        </motion.div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
