import { useState } from "react"
import { MessageCircle } from "lucide-react"
import ChatbotContainer from "./chatbot/ChatbotContainer"

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="btn btn-primary btn-circle shadow-xl"
            onClick={() => setOpen(true)}
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 
                     bg-base-100 text-base-content 
                     border border-base-300 
                     rounded-xl shadow-2xl
                     flex flex-col"
          style={{
            width: "400px",
            height: "500px"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-200">
            <span className="font-semibold">Chat Assistant</span>

            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatbotContainer />
          </div>
        </div>
      )}
    </>
  )
}