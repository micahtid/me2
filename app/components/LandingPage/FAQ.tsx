"use client";

import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

const FAQs = [
    {
        question: "What is Me2?",
        answer: "Me2 is a platform designed to help students connect with others who share similar academic interests, goals, and study habits. It provides a safe and efficient way to find study partners and build meaningful academic connections."
    },
    {
        question: "How does matching work?",
        answer: "Our algorithm matches you based on several factors including your academic interests, study preferences, and location. When you find a potential match, you can send a connection request to start chatting."
    },
    {
        question: "Is Me2 free to use?",
        answer: "Yes, Me2 is completely free to use for all students. We believe in making education and connections accessible to everyone."
    },
    {
        question: "How long do chat rooms last?",
        answer: "Chat rooms are active for 48 hours after a connection is made. This encourages meaningful interactions while maintaining privacy and safety."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
        <div className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
            <div className="absolute inset-0 bg-grid-black/[0.015] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="relative px-6 sm:px-8 md:px-10 lg:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-8 sm:gap-12">
                    {/* Header Section */}
                    <div className="space-y-4 sm:space-y-5 text-center lg:text-left">
                        <h3 className="font-bold text-3xl lg:text-5xl tracking-tight">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                            Have another question? Contact me by{" "}
                            <a href="mailto:micahtid@gmail.com" className="text-header underline transition-all duration-200">
                                email
                            </a>.
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-3 sm:space-y-4">
                        {FAQs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.08, duration: 0.2 }}
                            >
                                <div className={`
                                    rounded-xl overflow-hidden border
                                    ${activeIndex === index ? 'bg-primary/40 border-secondary/50' : 'bg-white border-gray-100'}
                                    transition-all duration-200
                                `}>
                                    {/* Question Header */}
                                    <div
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        className={`
                                            flex justify-between items-center p-4 sm:p-5
                                            cursor-pointer
                                            transition-colors duration-200
                                            ${activeIndex === index
                                                ? 'text-header'
                                                : 'text-gray-700 hover:text-header'
                                            }
                                        `}
                                    >
                                        <p className="font-semibold text-sm sm:text-base">
                                            {faq.question}
                                        </p>

                                        <div className={`
                                            p-2 rounded-lg flex-shrink-0 ml-4
                                            transition-all duration-200
                                            ${activeIndex === index
                                                ? 'bg-secondary/40 rotate-45'
                                                : 'bg-gray-100'
                                            }
                                        `}>
                                            <IoAdd className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Answer Section */}
                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-gray-700 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ