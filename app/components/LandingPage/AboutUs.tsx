'use client'

import { useState } from 'react'
import { FaGraduationCap, FaPeopleGroup, FaCheck } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'

const iconMap = {
    FaGraduationCap,
    FaPeopleGroup
}

export const about = [
    {
        title: "Chat Platform",
        icon: "FaGraduationCap",
        points: [
            "Match by interests, location, and curriculum",
            "Manage chat requests to and from others",
            "End-to-end encryption for total privacy"
        ]
    },
    {
        title: "Video Platform",
        icon: "FaPeopleGroup",
        points: [
            "Create and join custom study rooms",
            "Filter by subject and curriculum",
            "Seamless Zoom-powered experience"
        ]
    }
];

const AboutUs = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div 
        id="about"
        className="space-y-8">
            {/* Header */}
            <div className="default-container space-y-4">
                <h3 className="max-w-[800px] dynamic-subheading font-semibold">
                    Find Others Instantly & Start Chatting
                </h3>
                <p className='dynamic-text'>
                Let our custom algorithm match you with people who have high compatibility ratings. 
                Send a request, start chatting for 48 hours before the chat room closes. 
                It&apos;s that simple. Find someone like you.
                </p>
            </div>

            {/* Category Selection */}
            <div className="default-container flex flex-wrap gap-6">
                {about.map((item, index) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap]
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`flex items-center space-x-2 transition-colors duration-200
                                ${activeIndex === index 
                                    ? 'text-header' 
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                        </button>
                    )
                })}
            </div>

            {/* Content Points */}
            <div className="bg-gray-100 py-20">
                <div className="default-container space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3"
                        >
                            {about[activeIndex].points.map((point, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <FaCheck className="w-4 h-4 text-header mt-1 flex-shrink-0" />
                                    <p className='dynamic-text'>{point}</p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default AboutUs