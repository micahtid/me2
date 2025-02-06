'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

// Configuration for decorative shapes with scroll-based animations
const decorativeShapes = [
  {
    position: "left-[15%] top-[20%]",
    size: "w-8 h-8",
    opacity: "opacity-[8.5%]",
    color: "#004696",
    scrollSpeed: 0.5,
    rotation: 15,
    moveDown: false
  },
  {
    position: "right-[20%] top-[15%]",
    size: "w-6 h-6",
    opacity: "opacity-[8.5%]",
    color: "#0062CC", 
    scrollSpeed: 0.3, 
    rotation: -25,
    moveDown: true
  },
  {
    position: "right-[35%] top-[30%]",
    size: "w-10 h-10",
    opacity: "opacity-[6.5%]",
    color: "#003366", 
    scrollSpeed: 0.3,
    rotation: 30,
    moveDown: false
  },
  {
    position: "left-[35%] top-[5%]",
    size: "w-7 h-7",
    opacity: "opacity-[8.5%]",
    color: "#0052AB",
    scrollSpeed: 0.4, 
    rotation: -20,
    moveDown: true
  },
  {
    position: "right-[25%] top-[25%]",
    size: "w-9 h-9",
    opacity: "opacity-[7.5%]",
    color: "#0073E6", 
    scrollSpeed: 0.6,
    rotation: 35,
    moveDown: false
  }
];

const Decorations = () => {
  const { scrollY } = useScroll();
  const moveUpDistance = -350;
  const moveDownDistance = 800;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {decorativeShapes.map((shape, index) => {
        // Scroll Animation
        const y = useTransform(
          scrollY,
          [0, 1000],
          [0, shape.moveDown ? moveDownDistance * shape.scrollSpeed : moveUpDistance * shape.scrollSpeed]
        );

        return (
          <motion.div
            key={index}
            className={`
              absolute ${shape.position} ${shape.size}
              rounded-lg ${shape.opacity}
              max-[1000px]:hidden
            `}
            style={{
              y,
              backgroundColor: shape.color,
              rotate: shape.rotation
            }}
          />
        );
      })}
    </div>
  );
};

export default Decorations;