import { useEffect, useState } from "react"
import { sendChatbotStep } from "./chatbotApi"
import ChatMessageList from "./ChatMessageList"
import ChatOptionsRenderer from "./ChatOptionsRenderer"
import BookingModal from "./BookingModal"

export default function ChatbotContainer() {

    const [messages, setMessages] = useState([])
    const [currentStep, setCurrentStep] = useState(null)
    const [options, setOptions] = useState([])
    const [discardOption, setDiscardOption] = useState(false)

    const [selectedValue, setSelectedValue] = useState(null)
    const [loading, setLoading] = useState(false)

    const [selectedPlace, setSelectedPlace] = useState(null)
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [pricing, setPricing] = useState(null)

    // INITIAL LOAD
    useEffect(() => {
        if (messages.length === 0) {
            initializeChat()
        }
    }, [])

    const initializeChat = async () => {
        try {
            setLoading(true)
            const data = await sendChatbotStep()
            handleBotResponse(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleBotResponse = (data) => {

        if (data.message) {
            setMessages(prev => [
                ...prev,
                { role: "bot", text: data.message }
            ])
        }

        setCurrentStep(data.step || null)
        setOptions(data.options || [])
        setDiscardOption(data.discardOption || false)

        if (data.pricing) {
            setPricing(data.pricing)
            setShowBookingModal(true)
        }

        setSelectedValue(null)
    }

    const handleSelectOption = (value) => {
        setSelectedValue(value)
    }

    const handleNext = async () => {

        if (!selectedValue) return

        try {
            setLoading(true)

            // Show user message in chat
            setMessages(prev => [
                ...prev,
                {
                    role: "user",
                    text:
                        typeof selectedValue === "object"
                            ? selectedValue.label
                            : selectedValue
                }
            ])


            const valueToSend =
                typeof selectedValue === "object"
                    ? selectedValue.value
                    : selectedValue

            const data = await sendChatbotStep(null, valueToSend)

            handleBotResponse(data)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDiscard = async () => {
        try {
            const data = await sendChatbotStep("DISCARD")
            handleBotResponse(data)
        } catch (err) {
            console.error(err)
        }
    }

    // 🔥 When BookingModal submits tickets
    const handleBookingSuccess = (data) => {
        handleBotResponse(data)
    }

    const handleModalClose = async () => {
        try {
            setLoading(true)

            // Call backend to reset session
            const data = await sendChatbotStep("DISCARD")

            // Reset frontend state
            setShowBookingModal(false)
            setPricing(null)
            setSelectedPlace(null)
            setSelectedValue(null)

            // Update chat with restart message
            handleBotResponse(data)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ChatMessageList messages={messages} />

            <ChatOptionsRenderer
                step={currentStep}
                options={options}
                selectedValue={selectedValue}
                onSelect={handleSelectOption}
                discardOption={discardOption}
                onDiscard={handleDiscard}
            />

            {/* NEXT BUTTON */}
            {options.length > 0 && !showBookingModal && (
                <div className="p-3 bg-base-100">
                    <button
                        onClick={handleNext}
                        disabled={!selectedValue || loading}
                        className={`
        btn w-full transition-colors duration-200
        ${selectedValue && !loading
                                ? "bg-pink-500 hover:bg-pink-600 text-white border-none"
                                : "bg-gray-100 text-black cursor-not-allowed border-none dark:bg-gray-400"
                            }
      `}
                    >
                        {loading ? "Processing..." : "Next"}
                    </button>
                </div>
            )}

            {/* BOOKING MODAL */}
            {showBookingModal && (
                <BookingModal
                    placeId={selectedPlace}
                    pricing={pricing}
                    onClose={handleModalClose}
                    onSuccess={handleBookingSuccess}
                />
            )}
        </>
    )
}