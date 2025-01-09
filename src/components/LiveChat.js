import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {

  const [liveMessage, setLiveMessage] = useState("");

  const dispatch = useDispatch();

  const chatMessages = useSelector(store => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // API polling
      console.log("API polling");

      dispatch(addMessage({
        name: generateRandomName(),
        message: makeRandomMessage(20),
      })
      );
    }, 1000);

    return () => clearInterval(i);
  }, []);


  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {/* Disclamier - Don't use index as key */}
          {chatMessages.map((c, i) => (
            <ChatMessage key={i}
              name={c.name}
              message={c.message} />
          ))}
        </div>
      </div>

      <form className="w-full ml-2 p-2 border border-black rounded-lg" onSubmit={(e) => {
        e.preventDefault();
        console.log("submit", liveMessage);
        dispatch(addMessage({
          name: "Sumit Kasara",
          message: liveMessage,
        })
        );
        setLiveMessage("");
      }}>
        <input
          className="w-96 px-2 focus:outline-none"
          placeholder="Chat..."
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="px-2 mx-2 bg-green-100">Send</button>
      </form>
    </>
  );
};

export default LiveChat;