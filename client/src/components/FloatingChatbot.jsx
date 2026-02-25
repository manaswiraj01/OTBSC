import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import ChatbotContainer from "./chatbot/ChatbotContainer"

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [open])

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
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
          className="
  fixed z-50

  /* 📱 Mobile */
  inset-0 h-screen w-full rounded-none

  /* 📲 Tablet */
  md:inset-auto
  md:bottom-6 md:right-6
  md:w-[350px]
  md:h-[75vh]
  md:max-h-[600px]
  md:rounded-2xl

  lg:h-[70vh]
  
  /* 💻 Large Laptop */
  xl:h-[70vh]


  /* large large laptop */
  2xl:h-[70vh]
  2xl:w-[400px]

  bg-base-100 text-base-content
  shadow-2xl
  flex flex-col
"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 bg-pink-500 text-white sm:rounded-t-2xl">
            <span className="font-semibold text-lg">
              Chat Assistant
            </span>

            <button
              className="btn btn-sm btn-ghost text-white hover:bg-pink-600"
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