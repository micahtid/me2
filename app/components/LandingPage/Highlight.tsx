import { twMerge } from "tailwind-merge";

interface HighlightProps {
    icon: React.ReactNode;
    title: string;
    className?: string;
}

const Highlight: React.FC<HighlightProps> = ({ icon, title, className }) => {
  return (
    <div className={twMerge("shadow-lg py-1 px-4 rounded-full flex gap-x-4 items-center", className)}>
    {icon}
    <p className='font-title font-semibold'>{title}</p>
  </div>
  )
}

export default Highlight