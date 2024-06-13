import { useData } from "@/providers/DataProvider"

const RequestSection = () => {
  const {requests} = useData();

  return (
    <div>
      {requests?.map((request) => (
        <div>
          {request.chatid}
        </div>
      ))}
    </div>
  )
}

export default RequestSection