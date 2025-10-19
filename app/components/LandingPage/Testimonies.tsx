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
        <div className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-16">
                {/* Header Section */}
                <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 text-center">
                    <h3 className="font-bold text-3xl lg:text-5xl tracking-tight">
                        Our Wall of Love
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                        Read what our users have to say about Me2.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.2 }}
                            className="group"
                        >
                            <div className="h-full p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm
                                         hover:border-primary/30 transition-all duration-200">
                                <div className="flex flex-col h-full">
                                    {/* Quote Icon */}
                                    <div className="mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center
                                                      group-hover:bg-secondary/40 transition-colors duration-200">
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
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Testimonial Content */}
                                    <p className="text-sm sm:text-base text-gray-700 flex-grow leading-relaxed">
                                        "{testimonial.testimonial}"
                                    </p>

                                    {/* Author Information */}
                                    <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-sm text-header">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                                                    {testimonial.title}
                                                </p>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center text-sm font-semibold text-header
                                                          group-hover:bg-secondary/40 transition-colors duration-200">
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