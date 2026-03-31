import axios from "axios"
import { BASE_URL } from "../../utils/constants.js"

export const sendChatbotStep = async (action = null, value = null) => {
  try {
    const response = await axios.post(
      BASE_URL + "/chatbot/chat",
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