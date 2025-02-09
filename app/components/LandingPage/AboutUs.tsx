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
        <div className="relative py-24 bg-gradient-to-b from-white to-gray-50" id="about">
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            
            <div className="relative default-container space-y-12">
                {/* Header Section */}
                <div className="relative space-y-5 max-w-2xl mx-auto text-center">
                    <h3 className="dynamic-subheading font-semibold">
                        Find Others Instantly & Start Chatting📱
                    </h3>
                    <p className="dynamic-text text-black/70">
                        Let our custom algorithm match you with people who have high compatibility ratings. 
                        Send a request, start chatting for 48 hours before the chat room closes. 
                        It&apos;s that simple. Find someone like you.
                    </p>
                </div>

                {/* Category Selection */}
                <div className="flex flex-wrap justify-center gap-3">
                    {about.map((item, index) => {
                        const Icon = iconMap[item.icon as keyof typeof iconMap]
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`
                                    flex items-center space-x-2.5 px-6 py-2
                                    rounded-xl transition-all duration-300
                                    ${activeIndex === index 
                                        ? 'bg-primary/50 text-header' 
                                        : 'hover:bg-gray-50 text-gray-500 hover:text-gray-900'
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium text-base">{item.title}</span>
                            </button>
                        )
                    })}
                </div>
                
                {/* Content Points */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-3 gap-4 max-[1200px]:grid-cols-1"
                        >
                            {about[activeIndex].points.map((point, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center space-x-4 p-6 rounded-xl bg-white shadow-sm 
                                    group transition-color duration-300 hover:bg-secondary/50"
                                >
                                    <div className="flex-shrink-0 p-2 bg-primary/20 rounded-lg
                                    transition-color duration-300 group-hover:bg-white/50">
                                        <FaCheck className="w-4 h-4 text-header" />
                                    </div>
                                    <p className="text-black/70">
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