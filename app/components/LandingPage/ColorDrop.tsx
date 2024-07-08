import React from 'react'

interface ColorDropProps {
    children: React.ReactNode;
}

const ColorDrop: React.FC<ColorDropProps> = ({ children }) => {
  return (
    <div className='relative'>
        {children}
        <div
        className='absolute top-0 -z-10
        clipped-gradient opacity-50
        w-full h-[500px]' />
    </div>
  )
}

export default ColorDrop