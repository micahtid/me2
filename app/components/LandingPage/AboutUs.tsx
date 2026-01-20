'use client'

import { useState } from 'react'
import { FaGraduationCap, FaPeopleGroup, FaCheck } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'

const iconMap = {
    FaGraduationCap,
    FaPeopleGroup,
}

export const about = [
    {
        title: "Chat Platform",
        icon: "FaGraduationCap",
        points: [
            "Match on similar interests",
            "Match on shared curriculum",
            "Match on age & location",
        ],        
    },
    {
        title: "Video Platform",
        icon: "FaPeopleGroup",
        points: [
            "Create virtual study rooms",
            "Join virtual study rooms",
            "Filter virtual study rooms",
        ],
    },
];

const AboutUs = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-primary/[0.03] to-white" id="about">
            <div className="absolute inset-0 bg-grid-black/[0.015] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="relative px-6 sm:px-8 md:px-10 lg:px-12 max-w-7xl mx-auto space-y-10 sm:space-y-12 md:space-y-16">
                {/* Header Section */}
                <div className="relative space-y-4 sm:space-y-5 max-w-3xl mx-auto text-center">
                    <h3 className="font-bold text-3xl lg:text-5xl tracking-tight">
                        Find Others <span className="text-black">Instantly</span> & Start Chatting
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                        Let our custom algorithm match you with people who have high compatibility ratings.
                        Send a request, start chatting for 48 hours before the chat room closes.
                        It&apos;s that simple. Find someone like you.
                    </p>
                </div>

                {/* Category Selection */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {about.map((item, index) => {
                        const Icon = iconMap[item.icon as keyof typeof iconMap]
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`
                                    flex items-center space-x-2.5 px-5 sm:px-6 py-2.5 sm:py-3
                                    rounded-xl transition-all duration-200
                                    border-2
                                    ${activeIndex === index
                                        ? 'bg-primary border-secondary text-header shadow-sm'
                                        : 'bg-white border-gray-200 text-gray-600'
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-semibold text-sm sm:text-base">{item.title}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Content Points */}
                <div className="relative pt-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
                        >
                            {about[activeIndex].points.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.08, duration: 0.2 }}
                                    className="flex items-center space-x-4 p-5 sm:p-6 rounded-2xl bg-white border border-gray-100
                                    shadow-sm
                                    group transition-all duration-200"
                                >
                                                                         <div className="flex-shrink-0 p-2.5 bg-primary/30 rounded-xl
                                                                        transition-all duration-200">
                                                                            <FaCheck className="w-4 h-4 text-header" />
                                                                        </div>                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        {point}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default AboutUs