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
        <div className="relative py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            
            <div className="relative default-container">
                <div className="grid grid-cols-[35%_1fr] gap-12 max-[1200px]:grid-cols-1">
                    {/* Header Section */}
                    <div className="space-y-5">
                        <h3 className="dynamic-subheading font-semibold">
                            Frequently Asked Questions
                        </h3>
                        <p className="dynamic-text text-black/70">
                            Have another question? Contact me by{" "}
                            <a href="mailto:micahtid@gmail.com" className="underline">
                                email
                            </a>.
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-3">
                        {FAQs.map((faq, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={`
                                    rounded-xl overflow-hidden border border-gray-100
                                    ${activeIndex === index ? 'bg-primary/[50%]' : 'bg-white'}
                                    transition-all duration-300
                                `}>
                                    {/* Question Header */}
                                    <div
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        className={`
                                            flex justify-between items-center p-5
                                            cursor-pointer
                                            transition-colors duration-300
                                            ${activeIndex === index 
                                                ? 'text-header' 
                                                : 'text-gray-600 hover:text-gray-900'
                                            }
                                        `}
                                    >
                                        <p className="font-medium">
                                            {faq.question}
                                        </p>
                                        
                                        <div className={`
                                            p-2 rounded-lg
                                            transition-all duration-300
                                            ${activeIndex === index 
                                                ? 'bg-primary/[30%] rotate-45' 
                                                : 'bg-gray-50'
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
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-5 pb-5 text-black/70">
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