import React from 'react'

interface WithBackgroundProps {
    children: React.ReactNode;
    color?: string;
    tiltDegree?: number;
    borderHeight?: number;
}

const WithBackground = ({ 
    children, 
    color = '#f8fafc',  // Default to a very light slate color
    tiltDegree = -3,    // Default tilt
    borderHeight = 40   // Default border height
}: WithBackgroundProps) => {
    return (
        <div className="relative">
            {/* Top gradient border */}
            <div 
                className="absolute w-full h-[40px] top-0 left-0 z-10"
                style={{
                    background: `linear-gradient(to left, ${color}10 0%, ${color} 100%)`,
                    transform: `translateY(-100%) skewY(${tiltDegree}deg)`,
                    transformOrigin: 'bottom',
                    height: `${borderHeight}px`
                }}
            />

            {/* Main background */}
            <div 
                className="relative z-10"
                style={{
                    background: color,
                    transform: `skewY(${tiltDegree}deg)`,
                    transformOrigin: 'top',
                }}
            >
                {/* Content wrapper to counter-tilt the content */}
                <div 
                    className="relative z-10"
                    style={{
                        transform: `skewY(${-tiltDegree}deg)`,
                        transformOrigin: 'top',
                    }}
                >
                    {children}
                </div>
            </div>

            {/* Bottom gradient border */}
            <div 
                className="absolute w-full h-[40px] bottom-0 left-0 z-0"
                style={{
                    background: `linear-gradient(to right, ${color}10 0%, ${color} 100%)`,
                    transform: `translateY(100%) skewY(${tiltDegree}deg)`,
                    transformOrigin: 'top',
                    height: `${borderHeight}px`
                }}
            />
        </div>
    );
};

export default WithBackground;