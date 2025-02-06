'use client'

import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import WithBackground from "./WithBackground"

// FAQ data configuration
const FAQs = [
    {
        question: "Is this service free to use, and is my data private?",
        answer: "Yes, this service is completely free with no hidden charges. We do not store any personal information—your privacy is a top priority."
    },
    {
        question: "How do chats work? Do they stay open forever?",
        answer: "Once a user accepts a chat request, the chat room is open for 48 hours. You can close it anytime, and after the chat ends, you'll have the option to share social media through Me2, which you can accept or decline."
    },
    {
        question: "What is the age requirement to use this service?",
        answer: "This platform is designed for students aged 12 to 22."
    },
    {
        question: "Is this project open-source?",
        answer: "Yes, this project is open-source. Check out our developers at the bottom of the page for more details."
    }
];

// Animation variants for FAQ answers
const answerVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 }
}

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <WithBackground color="#DDEEFF" tiltDegree={-2} borderHeight={40}>
            <div className="default-container py-24">
                <div className="
                    grid 
                    xl:grid-cols-[40%_60%] 
                    lg:grid-cols-[40%_60%] 
                    gap-8
                ">
                    {/* Left Column - Header Section */}
                    <div className="space-y-4">
                        <h3 className="dynamic-subheading font-semibold">
                            Frequently Asked Questions☝️
                        </h3>
                        <p className="dynamic-text text-black/80">
                            Have another question? Contact us by{" "}
                            <a href="mailto:micahtid@gmail.com" className="underline"
                            > email</a>.
                        </p>
                    </div>

                    {/* Right Column - FAQ Items */}
                    <div className="space-y-2">
                        {FAQs.map((faq, index) => (
                            <div key={index}>
                                {/* FAQ Question Header */}
                                <div
                                    onClick={() => toggleFAQ(index)}
                                    className="
                                        flex 
                                        justify-between 
                                        items-center 
                                        space-x-4 
                                        py-4 
                                        cursor-pointer 
                                        border-t 
                                        border-black/20
                                        ${activeIndex === index ? 'text-primary' : 'text-gray-900'}
                                    "
                                >
                                    <p className="dynamic-text font-medium">
                                        {faq.question}
                                    </p>
                                    
                                    {/* Animated Plus/Minus Icon */}
                                    <div className={`
                                        transition-transform 
                                        duration-200
                                        ${activeIndex === index ? 'rotate-45' : 'rotate-0'}
                                    `}>
                                        <IoAdd className="w-5 h-5" />
                                    </div>
                                </div>
                                
                                {/* Animated Answer Section */}
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            variants={answerVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-4 text-black/80">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WithBackground>
    )
}

export default FAQ