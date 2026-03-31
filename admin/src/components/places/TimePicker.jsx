import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

const hours = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
]

const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
)

export default function TimePicker({ value, onChange }) {

    const safeValue = {
        hour: value?.hour || "",
        minute: value?.minute || "",
        period: value?.period || ""
    }

    const handleChange = (part, val) => {
        onChange(part, val)
    }

    return (

        <div className="flex items-center gap-2">

            {/* HOUR */}
            <Select
                value={safeValue.hour}
                onValueChange={(v) => handleChange("hour", v)}
            >
                <SelectTrigger className="w-24 h-9 bg-zinc-900 border-zinc-700 text-sm">
                    <SelectValue placeholder="HH" />
                </SelectTrigger>

                <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    className="bg-zinc-900 border-zinc-700 max-h-65 overflow-y-auto w-24"
                >
                    {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                            {h}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <span className="text-zinc-400">:</span>

            {/* MINUTES */}
            <Select
                value={safeValue.minute}
                onValueChange={(v) => handleChange("minute", v)}
            >
                <SelectTrigger className="w-24 h-9 bg-zinc-900 border-zinc-700 text-sm">
                    <SelectValue placeholder="MM" />
                </SelectTrigger>

                <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    className="bg-zinc-900 border-zinc-700 max-h-65 overflow-y-auto w-24"
                >
                    {minutes.map((m) => (
                        <SelectItem key={m} value={m}>
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* AM PM */}
            <Select
                value={safeValue.period}
                onValueChange={(v) => handleChange("period", v)}
            >
                <SelectTrigger className="w-24 h-9 bg-zinc-900 border-zinc-700 text-sm">
                    <SelectValue placeholder="AM" />
                </SelectTrigger>

                <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    className="bg-zinc-900 border-zinc-700 max-h-40 overflow-y-auto w-24"
                >
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}