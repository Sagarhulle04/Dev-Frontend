import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetId } = useParams();

  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);

  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !targetId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      userId,
      targetId,
    });

    socketRef.current.on("messageReceived", ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/${targetId}`, {
          withCredentials: true,
        });

        setData(res.data.message);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetId]);

  const sendMessages = () => {
    if (!sendMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetId,
      text: sendMessage,
    });

    setSendMessage("");
  };

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center p-6 mb-16">
      <div className="w-full max-w-3xl h-[90vh] rounded-2xl border border-gray-700 overflow-hidden flex flex-col">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            {data?.firstName?.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {data?.firstName} {data?.lastName}
            </h2>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.firstName === user?.firstName
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                  msg.firstName === user?.firstName
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 p-4 flex gap-3">
          <input
            type="text"
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-600 bg-transparent px-5 py-3 outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessages();
              }
            }}
          />

          <button
            onClick={sendMessages}
            className="rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
