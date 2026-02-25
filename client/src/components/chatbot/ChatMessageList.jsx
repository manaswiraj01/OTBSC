import { useEffect, useRef } from "react"

export default function ChatMessageList({ messages }) {
  const bottomRef = useRef(null)

  // Auto scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto chatbot-scroll p-4 space-y-3">

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === "user"
              ? "justify-end"
              : "justify-start"
            }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${msg.role === "user"
                ? "bg-pink-500 text-white shadow-md"
                : "bg-base-200 text-base-content"
              }`}
          >
            {msg.text}
          </div>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  )
}