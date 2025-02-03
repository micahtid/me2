import { FaStar } from "react-icons/fa"

const testimonials = [
  {
      name: "Lily Matthews",
      rating: 5,
      title: "High School Student",
      testimonial: "I see Me2 helping me find people who share my academic interests. It’s hard to connect with others who get what I’m into, but Me2 could change that."
  },
  {
      name: "Jake Nguyen",
      rating: 5,
      title: "College Freshman",
      testimonial: "Me2 seems like a great way to connect with others who are into tech like me. I’m excited to find study partners and build connections with people who share my goals."
  },
  {
      name: "Sophia Liu",
      rating: 4,
      title: "High School Junior",
      testimonial: "Me2 could help me meet people who are into the same creative projects. I’m looking forward to finding others who share my passion for art and innovation."
  },
  {
      name: "Ethan Patel",
      rating: 5,
      title: "Senior High School Student",
      testimonial: "I think Me2 could help me connect with students who are into academic research like I am. It’s hard to find people with the same interests, but Me2 could change that."
  }
];

const Testimonies = () => {
    return (
        <div className="default-container space-y-12">
            <div className="space-y-4">
                <h3 className="dynamic-subheading font-semibold text-center">Our Wall of Love</h3>
                <p className="dynamic-text text-center">
                    Read what our user have to say about Me2.
                </p>
            </div>
            
            {/* Masonry-style layout container */}
            <div className="columns-1 md:columns-2 gap-6 [column-fill:_initial]">
                {testimonials.map((testimonial, index) => (
                    <div 
                        key={index}
                        className={`
                            bg-white rounded-lg p-6 mb-6
                            break-inside-avoid-column
                            shadow-md
                            transform transition-all duration-300
                            hover:scale-[1.025] hover:shadow-lg
                        `}
                    >
                        <div className="flex flex-col">
                            {/* Star Rating */}
                            <div className="flex items-center gap-2 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < testimonial.rating
                                                ? "text-yellow-400"
                                                : "text-gray-400"
                                        }`}
                                    />
                                ))}
                            </div>
                            
                            {/* Content */}
                            <p className="text-[15px] leading-relaxed text-gray-600 mb-4">
                                "{testimonial.testimonial}"
                            </p>
                            
                            {/* Author */}
                            <div className="mt-4">
                                <h4 className="font-medium text-header">
                                    {testimonial.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {testimonial.title}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonies