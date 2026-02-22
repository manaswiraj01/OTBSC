import { useState, useEffect } from "react"
import { sendChatbotStep } from "./chatbotApi"

export default function BookingModal({
  pricing,
  onClose,
  onSuccess
}) {

  const today = new Date().toISOString().split("T")[0]

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

      const data = await sendChatbotStep(null, {
        visitDate,
        tickets: formattedTickets
      })

      onSuccess(data)
      onClose()

    } catch (err) {
      console.error(err)
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
            className="btn btn-primary w-full"
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