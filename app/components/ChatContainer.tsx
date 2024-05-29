"use state"

import { useRef, useState } from "react";

import { getMessages, sendMessage } from "../utils/databasefunctions";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
    const messages = getMessages();

    const [formValue, setFormValue] = useState("");
    const dummy = useRef<HTMLDivElement>(null);
  
    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
      sendMessage(e, formValue, setFormValue, dummy);
    };
  
    return (
      <div className="">
        <div>
          Chat:
          {messages &&
            messages.map((msg, index) => (
              <ChatMessage key={index} document={msg} />
            ))}
        </div>
        <div ref={dummy}></div>
        <form onSubmit={handleSubmit}>
          <input value={formValue} onChange={((e) => setFormValue(e.target.value))} type="text" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  };

export default ChatContainer
  
  