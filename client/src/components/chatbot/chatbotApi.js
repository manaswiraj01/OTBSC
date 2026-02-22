import axios from "axios"

export const sendChatbotStep = async (action = null, value = null) => {
  try {
    const response = await axios.post(
      "/chatbot/chat", // IMPORTANT
      {
        action,
        value
      },
      {
        withCredentials: true
      }
    )

    return response.data
  } catch (error) {
    console.error("Chatbot API Error:", error)
    throw error.response?.data || { message: "Chatbot request failed" }
  }
}