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

    const handleChange = (part, val) => {
        onChange(part, val)
    }

    return (

        <div className="flex items-center gap-2">

            {/* HOUR */}
            <Select value={value?.hour} onValueChange={(v) => handleChange("hour", v)}>
                <SelectTrigger className="w-24 h-9 bg-zinc-900 border-zinc-700 text-sm">
                    <SelectValue placeholder="HH" />
                </SelectTrigger>

                <SelectContent
                    className="bg-zinc-900 border-zinc-700 w-24! min-w-24 max-h-32 overflow-y-auto"
                    position="popper"
                >
                    {hours.map((h) => (
                        <SelectItem key={h} value={h} className="text-sm py-1">
                            {h}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <span className="text-zinc-400">:</span>

            {/* MINUTES */}
            <Select value={value?.minute} onValueChange={(v) => handleChange("minute", v)}>
                <SelectTrigger className="w-24 h-9 bg-zinc-900 border-zinc-700 text-sm">
                    <SelectValue placeholder="MM" />
                </SelectTrigger>

                <SelectContent
                    className="bg-zinc-900 border-zinc-700 w-24! min-w-24 max-h-32 overflow-y-auto"
                    position="popper"
                >
                    {minutes.map((m) => (
                        <SelectItem key={m} value={m} className="text-sm py-1">
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* AM PM */}
            <Select value={value?.period} onValueChange={(v) => handleChange("period", v)}>
                <SelectTrigger className="w-24 h-9 bg-zinc-900 border-zinc-700 text-sm">
                    <SelectValue placeholder="AM" />
                </SelectTrigger>

                <SelectContent position="popper" className="bg-zinc-900 border-zinc-700 w-24! min-w-24">
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
            </Select>

        </div>

    )

}