"use client";

import { FaStar, FaQuoteLeft } from "react-icons/fa"
import { motion } from "framer-motion"

const testimonials = [
    {
        name: "Jake Nguyen",
        rating: 5,
        title: "College Freshman",
        testimonial: "Me2 seems like a great way to connect with others who are into tech like me. I'm excited to find study partners and build connections with people who share my goals."
    },
    {
        name: "Sophia Liu",
        rating: 4,
        title: "High School Junior",
        testimonial: "Me2 could help me meet people who are into the same creative projects. I'm looking forward to finding others who share my passion for art and innovation."
    },
    {
        name: "Ethan Patel",
        rating: 5,
        title: "Senior High School Student",
        testimonial: "I think Me2 could help me connect with students who are into academic research like I am. It's hard to find people with the same interests, but Me2 could change that."
    }
];

const Testimonies = () => {
    return (
        <div className="py-24 bg-white">
            <div className="default-container space-y-16">
                {/* Header Section */}
                <div className="max-w-2xl mx-auto space-y-5 text-center">
                    <h3 className="dynamic-subheading font-semibold">
                        Our Wall of Love
                    </h3>
                    <p className="dynamic-text text-black/70">
                        Read what our users have to say about Me2.
                    </p>
                </div>
                
                {/* Testimonials Grid */}
                <div className="grid grid-cols-3 gap-8 max-[1200px]:grid-cols-1">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 shadow-sm 
                                         transition-all duration-300 hover:-translate-y-4">
                                <div className="flex flex-col h-full">
                                    {/* Quote Icon */}
                                    <div className="mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/[30%] flex items-center justify-center
                                                      group-hover:bg-primary/50 transition-colors duration-300">
                                            <FaQuoteLeft className="w-4 h-4 text-header" />
                                        </div>
                                    </div>

                                    {/* Star Rating */}
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < testimonial.rating
                                                        ? "text-yellow-400"
                                                        : "text-gray-200"
                                                } group-hover:scale-110 transition-transform duration-300`}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Testimonial Content */}
                                    <p className="text-base text-black/70 flex-grow leading-relaxed">
                                        "{testimonial.testimonial}"
                                    </p>
                                    
                                    {/* Author Information */}
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-sm text-header">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-sm text-black/70 mt-0.5">
                                                    {testimonial.title}
                                                </p>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-primary/[30%] flex items-center justify-center text-base font-medium text-header
                                                          group-hover:bg-primary/50 transition-colors duration-300">
                                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonies