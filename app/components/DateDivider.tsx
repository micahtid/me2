interface DateDividerProps {
    children: React.ReactNode;
}

const DateDivider: React.FC<DateDividerProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-x-2
    mt-8">
        <div className="bg-gray-200 flex-grow
        h-[1px] rounded-lg"></div>
        <p className="text-gray-400 text-xs font-semibold">{children}</p>
        <div className="bg-gray-200 flex-grow
        h-[1px] rounded-lg"></div>
    </div>
  )
}

export default DateDivider