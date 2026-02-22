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

        // 🔥 THIS IS THE FIX
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

        const data = await sendChatbotStep("DISCARD")

        setMessages(prev => [
            ...prev,
            { role: "bot", text: data.message }
        ])

        handleBotResponse(data)
    }

    // 🔥 When BookingModal submits tickets
    const handleBookingSuccess = (data) => {
        handleBotResponse(data)
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
                <div className="p-3 border-t bg-base-100">
                    <button
                        onClick={handleNext}
                        disabled={!selectedValue || loading}
                        className="btn btn-primary w-full"
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
                    onClose={() => setShowBookingModal(false)}
                    onSuccess={handleBookingSuccess}
                />
            )}
        </>
    )
}