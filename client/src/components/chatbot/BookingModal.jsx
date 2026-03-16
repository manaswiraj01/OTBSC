import { useState, useEffect } from "react"
import { sendChatbotStep } from "./chatbotApi"
import { BASE_URL } from "@/utils/constants"

export default function BookingModal({
  pricing,
  onClose,
  onSuccess
}) {

  const getMinBookingDate = () => {

    const now = new Date()

    const cutoff = new Date()
    cutoff.setHours(12, 0, 0, 0)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (now >= cutoff) {
      today.setDate(today.getDate() + 1)
    }

    return today.toISOString().split("T")[0]
  }

  const today = getMinBookingDate()

  const [visitDate, setVisitDate] = useState("")
  const [tickets, setTickets] = useState({
    indianAdult: 0,
    indianStudent: 0,
    foreignerAdult: 0,
    foreignerStudent: 0
  })

  const [totalAmount, setTotalAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  // 🔥 LIVE PRICE CALCULATION FROM DB
  useEffect(() => {

    if (!pricing) return

    const total =
      tickets.indianAdult * (pricing.indianAdult || 0) +
      tickets.indianStudent * (pricing.indianStudent || 0) +
      tickets.foreignerAdult * (pricing.foreignerAdult || 0) +
      tickets.foreignerStudent * (pricing.foreignerStudent || 0)

    setTotalAmount(total)

  }, [tickets, pricing])

  const changeCount = (type, value) => {
    setTickets(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value)
    }))
  }

  // 🔥 BULK INPUT SUPPORT
  const handleInputChange = (type, value) => {

    const numericValue = parseInt(value)

    if (isNaN(numericValue) || numericValue < 0) return

    setTickets(prev => ({
      ...prev,
      [type]: numericValue
    }))
  }

  const totalTickets =
    tickets.indianAdult +
    tickets.indianStudent +
    tickets.foreignerAdult +
    tickets.foreignerStudent

  const handleSubmit = async () => {

    const selectedDate = new Date(visitDate)
    const minDate = new Date(getMinBookingDate())

    selectedDate.setHours(0, 0, 0, 0)

    if (selectedDate < minDate) {
      alert("Today's booking closed after 12 PM. Please select tomorrow.")
      return
    }

    if (!visitDate) {
      alert("Please select visit date")
      return
    }

    if (totalTickets === 0) {
      alert("Select at least one ticket")
      return
    }

    const formattedTickets = []

    if (tickets.indianAdult > 0)
      formattedTickets.push({
        type: "Adult",
        quantity: tickets.indianAdult,
        nationality: "Indian"
      })

    if (tickets.indianStudent > 0)
      formattedTickets.push({
        type: "Student",
        quantity: tickets.indianStudent,
        nationality: "Indian"
      })

    if (tickets.foreignerAdult > 0)
      formattedTickets.push({
        type: "Adult",
        quantity: tickets.foreignerAdult,
        nationality: "Foreigner"
      })

    if (tickets.foreignerStudent > 0)
      formattedTickets.push({
        type: "Student",
        quantity: tickets.foreignerStudent,
        nationality: "Foreigner"
      })

    try {
      setLoading(true)

      // 🔥 STEP 1: Save ticket info in chatbot session
      await sendChatbotStep(null, {
        visitDate,
        tickets: formattedTickets
      })

      // 🔥 STEP 2: Create Stripe checkout session
      const response = await fetch(
        BASE_URL + "/payment/create-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // IMPORTANT (cookies auth)
        }
      )

      const data = await response.json()

      if (data.url) {
        // 🔥 STEP 3: Redirect to Stripe
        window.location.href = data.url
      } else {
        alert("Stripe session failed")
      }

    } catch (err) {

      console.error(err)

      if (err?.response?.data?.message) {
        alert(err.response.data.message)
      } else {
        alert("Booking failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-base-100 w-[900px] rounded-2xl p-6 shadow-2xl grid grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          <h2 className="text-2xl font-bold">
            Member Details
          </h2>

          <div>
            <label className="label font-semibold">Visit Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              min={today}
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
            />
            <span className="text-xs text-gray-400">
              Same-day booking closes at 12 PM
            </span>
          </div>

          {[
            { label: "Indian Citizen", key: "indianAdult", price: pricing?.indianAdult },
            { label: "Indian Student", key: "indianStudent", price: pricing?.indianStudent },
            { label: "Foreign Citizen", key: "foreignerAdult", price: pricing?.foreignerAdult },
            { label: "Foreign Student", key: "foreignerStudent", price: pricing?.foreignerStudent }
          ].map((item, index) => (

            <div key={index} className="flex justify-between items-center">

              <div>
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm text-gray-400">
                  ₹ {item.price || 0} per person
                </p>
              </div>

              <div className="flex items-center gap-2">

                <button
                  className="btn btn-sm"
                  onClick={() => changeCount(item.key, -1)}
                >
                  -
                </button>

                {/* 🔥 Editable Input */}
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-20 text-center"
                  value={tickets[item.key]}
                  onChange={(e) =>
                    handleInputChange(item.key, e.target.value)
                  }
                />

                <button
                  className="btn btn-sm"
                  onClick={() => changeCount(item.key, 1)}
                >
                  +
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-base-200 rounded-xl p-6 space-y-5">

          <h3 className="text-xl font-semibold">
            Payment Details
          </h3>

          <div className="flex justify-between">
            <span>Total Tickets</span>
            <span>{totalTickets}</span>
          </div>

          <div className="flex justify-between">
            <span>Visit Date</span>
            <span>{visitDate || "-"}</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>₹ {totalAmount}</span>
          </div>

          <button
            className="btn btn-secondary w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>

          <button
            className="btn btn-ghost w-full"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  )
}