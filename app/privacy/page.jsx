"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Lock, FileText } from "lucide-react";

const PrivacyPolicy = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -120, 0],
                        y: [0, 80, 0],
                        scale: [1, 0.8, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/20 rounded-full"
                    style={{
                        left: `${15 + i * 10}%`,
                        top: `${20 + i * 12}%`,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Main content */}
            <div className="relative z-10 px-4 py-12 max-w-4xl mx-auto text-white">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-purple-200 mt-4">
                        Last Updated: July 2, 2025
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Introduction
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            Mind Test App (“we,” “us,” or “our”) provides an informational mental health screening tool using validated questionnaires (PHQ-9, GAD-7, ASRS, AQ-10) to help users gain insights into their well-being. This Privacy Policy explains how we collect, use, protect, and share your information when you use our app. Your privacy is important to us, and we are committed to safeguarding your data. This app is not a diagnostic tool, and results should be discussed with a licensed professional.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <Lock className="w-6 h-6 mr-2" />
                            Information We Collect
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            We collect the following information:
                            <ul className="list-disc pl-5 mt-2">
                                <li><strong>Screening Responses</strong>: Answers to our 32-question screening are temporarily stored in your browser’s local storage to generate results and a PDF report.</li>
                                <li><strong>Usage Data</strong>: Non-identifiable data, such as app interactions (e.g., pages visited, time spent), may be collected to improve the app.</li>
                                <li><strong>No Personal Information</strong>: We do not collect names, email addresses, or other personally identifiable information unless you choose to contact us.</li>
                            </ul>
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            How We Use Your Information
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            Your information is used to:
                            <ul className="list-disc pl-5 mt-2">
                                <li>Generate personalized screening results and a downloadable PDF report.</li>
                                <li>Provide tailored insights and advice based on your responses.</li>
                                <li>Improve the app’s functionality and user experience through anonymized usage data.</li>
                            </ul>
                            We do not use your data for marketing, profiling, or sharing with third parties for purposes other than app functionality.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <Lock className="w-6 h-6 mr-2" />
                            Data Storage and Security
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            Your screening responses are stored temporarily in your browser’s local storage and are cleared when you close the app or clear your browser data. We use HTTPS to secure data transmission to our servers for generating advice. We are committed to implementing encryption and other security measures in future updates to protect sensitive data. However, no method is 100% secure, and we recommend consulting a professional for handling sensitive health information.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Sharing Your Information
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            We do not share your screening responses or usage data with third parties, except:
                            <ul className="list-disc pl-5 mt-2">
                                <li>When you choose to share your results (e.g., via the “Share with Provider” feature).</li>
                                <li>With service providers (e.g., AI model providers) to process anonymized data for generating advice, under strict confidentiality agreements.</li>
                                <li>As required by law or to protect our rights.</li>
                            </ul>
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Your Rights
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            You have the right to:
                            <ul className="list-disc pl-5 mt-2">
                                <li>Access your screening responses stored in your browser’s local storage.</li>
                                <li>Delete your data by clearing your browser’s local storage or closing the app.</li>
                                <li>Contact us at support@mindtestapp.com to inquire about data practices.</li>
                            </ul>
                            Since we do not collect personally identifiable information, no account deletion process is required.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Third-Party Services
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            We use third-party services (e.g., Google Generative AI for advice generation) to process anonymized data. These providers are bound by confidentiality agreements and do not retain or share your data. Links to external resources (e.g., helplines) may have their own privacy policies, which we encourage you to review.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Changes to This Policy
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            We may update this Privacy Policy to reflect changes in our practices or legal requirements. The updated policy will be posted on this page with the “Last Updated” date. We encourage you to review this policy periodically.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Contact Us
                        </h2>
                        <p className="text-purple-200 leading-relaxed">
                            If you have questions about this Privacy Policy or our data practices, please contact us at:
                            <br />
                            Email: support@mindtestapp.com
                            <br />
                            Address: 123 Wellness Way, Suite 100, Health City, HC 12345
                        </p>
                    </motion.section>

                    <motion.div
                        variants={itemVariants}
                        className="text-center mt-12"
                    >
                        <Link href="/">
                            <motion.button
                                className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 rounded-full border border-white/20"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center">
                                    Back to Home
                                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;