import { useActivePage } from "@/hooks/useActivePage"

const ChatNav = () => {
    const {currentPage, onChange} = useActivePage();

    const options = [
        {label: "Chat", onClick: () => onChange("chat")},
        {label: "Requests", onClick: () => onChange("requests")},
        {label: "New People", onClick: () => onChange("new people")}
    ]

  return (
    <div className='flex flex-row justify-start items-center gap-x-5 flex-wrap
    w-full bg-gray-100 p-3 rounded-md'>
        {
            options.map((option, index) => (
                <button key={index} className={`rounded-full px-5 py-1
                    ${currentPage === option.label.toLowerCase() ? "bg-cyan-300/30 font-semibold" : "bg-gray-500/10"}`}
                onClick={option.onClick}>
                    {option.label}
                </button>
            ))
        }
    </div>
  )
}

export default ChatNav