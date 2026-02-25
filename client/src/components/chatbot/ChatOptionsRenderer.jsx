export default function ChatOptionsRenderer({
  step,
  options,
  selectedValue,
  onSelect,
  discardOption,
  onDiscard
}) {
  if (!step) return null

  // 🔹 GREETING & CATEGORY → Buttons
  if (step === "GREETING" || step === "CATEGORY_SELECTION") {
    return (
      <div className="p-4 space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className="btn border-pink-500  w-full bg-transparent"
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}

        {discardOption && (
          <button
            className="btn border-pink-500 w-full bg-transparent"
            onClick={onDiscard}
          >
            Discard Booking
          </button>
        )}
      </div>
    )
  }

  // 🔹 STATE / CITY / PLACE → Controlled Dropdown
  if (
    step === "STATE_SELECTION" ||
    step === "CITY_SELECTION" ||
    step === "PLACE_SELECTION"
  ) {
    return (
      <div className="p-4 space-y-3">

        <select
          className="
    select w-full
    border-1 border-pink-500
    focus:border-pink-500
    focus:ring-0
    focus:outline-none
    outline-none
  "
          value={selectedValue?.value || selectedValue || ""}
          onChange={(e) => {

            const value = e.target.value
            if (!value) return

            if (step === "PLACE_SELECTION") {
              const selectedObj = options.find(
                (opt) => opt.value === value
              )

              // send full object (label + value)
              onSelect(selectedObj)
            } else {
              onSelect(value)
            }
          }}
        >
          <option value="">Select an option</option>

          {options.map((option, index) => (
            <option
              key={index}
              value={
                typeof option === "string"
                  ? option
                  : option.value
              }
            >
              {typeof option === "string"
                ? option
                : option.label}
            </option>
          ))}
        </select>

        {discardOption && (
          <button
            className="btn border-pink-500 w-full bg-transparent"
            onClick={onDiscard}
          >
            Discard Booking
          </button>
        )}
      </div>
    )
  }

  return null
}