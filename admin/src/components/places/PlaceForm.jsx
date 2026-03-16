import { useState } from "react"
import { useDropzone } from "react-dropzone"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

import TimePicker from "@/components/places/TimePicker"

import { State, City } from "country-state-city"

import { toast } from "react-hot-toast"

const states = State.getStatesOfCountry("IN")

const PlaceForm = ({ initialData = {}, mode = "add", onSubmit }) => {

    const [formData, setFormData] = useState({

        name: initialData.name || "",
        description: initialData.description || "",
        category: initialData.category || "",
        address: initialData.address || "",
        state: initialData.state || "",
        stateCode: "",
        city: initialData.city || "",
        pincode: initialData.pincode || "",
        contactEmail: initialData.contactEmail || "",
        contactPhone: initialData.contactPhone || "",

        openingTime: initialData.openingTime || {
            hour: "06",
            minute: "00",
            period: "AM"
        },

        closingTime: initialData.closingTime || {
            hour: "06",
            minute: "00",
            period: "PM"
        },

        pricing: {
            indianAdult: initialData?.pricing?.indianAdult || "",
            indianStudent: initialData?.pricing?.indianStudent || "",
            foreignerAdult: initialData?.pricing?.foreignerAdult || "",
            foreignerStudent: initialData?.pricing?.foreignerStudent || ""
        }

    })

    const [images, setImages] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePricingChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                [name]: value
            }
        }))
    }

    const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })

    const onDrop = async (files) => {

        const remaining = 5 - images.length

        if (files.length > remaining) {

            toast.error(`You can only select ${remaining} more image${remaining > 1 ? "s" : ""}`)

            return
        }

        const newImages = []

        for (let file of files) {

            const base64 = await convertToBase64(file)

            newImages.push({
                preview: URL.createObjectURL(file),
                base64
            })

        }

        setImages(prev => [...prev, ...newImages])

    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] }
    })

    const submitHandler = (e) => {
        e.preventDefault()

        console.log("FORM DATA:", formData)

        console.log({
            ...formData,
            photoUrls: images.map(img => img.base64)
        })

        onSubmit({
            ...formData,
            pricing: {
                indianAdult: Number(formData.pricing.indianAdult),
                indianStudent: Number(formData.pricing.indianStudent),
                foreignerAdult: Number(formData.pricing.foreignerAdult),
                foreignerStudent: Number(formData.pricing.foreignerStudent)
            },
            photoUrls: images.map(img => img.base64)
        })

    }

    const cities = City.getCitiesOfState("IN", formData.stateCode)

    return (

        <form onSubmit={submitHandler} className="space-y-6">

            <Input
                name="name"
                placeholder="Place Name"
                value={formData.name}
                onChange={handleChange}
            />

            <Textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />

            <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >

                <SelectTrigger className="bg-zinc-900 w-full border-zinc-700">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent position="popper" className="bg-zinc-900 border-zinc-700">

                    <SelectItem value="Museum">Museum</SelectItem>
                    <SelectItem value="Wildlife">Wildlife</SelectItem>
                    <SelectItem value="Monument">Monument</SelectItem>

                </SelectContent>

            </Select>

            <Textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
            />

            <div className="grid grid-cols-3 gap-4">

                {/* STATE */}
                <Select
                    value={formData.state}
                    onValueChange={(value) => {

                        const selectedState = states.find(s => s.name === value)

                        setFormData(prev => ({
                            ...prev,
                            state: value,
                            stateCode: selectedState.isoCode,
                            city: ""
                        }))

                    }}
                >

                    <SelectTrigger className="bg-zinc-900 w-full border-zinc-700">
                        <SelectValue placeholder="Select State" />
                    </SelectTrigger>

                    <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        className="bg-zinc-900 border-zinc-700 max-h-65 overflow-y-auto w-68"
                    >

                        {states.map(state => (
                            <SelectItem
                                key={state.isoCode}
                                value={state.name}
                            >
                                {state.name}
                            </SelectItem>
                        ))}

                    </SelectContent>

                </Select>


                {/* CITY */}
                <Select
                    value={formData.city}
                    onValueChange={(value) =>
                        setFormData(prev => ({ ...prev, city: value }))
                    }
                >

                    <SelectTrigger className="bg-zinc-900 w-full border-zinc-700">
                        <SelectValue placeholder="Select City" />
                    </SelectTrigger>

                    <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        className="bg-zinc-900 border-zinc-700 max-h-65 overflow-y-auto w-68"
                    >

                        {cities?.map(city => (
                            <SelectItem
                                key={city.name}
                                value={city.name}
                            >
                                {city.name}
                            </SelectItem>
                        ))}

                    </SelectContent>
                </Select>

                <Input
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                />

            </div>

            <div className="grid grid-cols-2 gap-4">

                <Input name="contactEmail" value={formData.contactEmail} placeholder="Contact Email" onChange={handleChange} />
                <Input name="contactPhone" value={formData.contactPhone} placeholder="Contact Phone" onChange={handleChange} />

            </div>

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <p className="text-sm text-muted-foreground mb-2">
                        Opening Time
                    </p>

                    <TimePicker
                        value={formData.openingTime}
                        onChange={(type, value) => {
                            setFormData(prev => ({
                                ...prev,
                                openingTime: {
                                    ...prev.openingTime,
                                    [type]: value
                                }
                            }))
                        }}
                    />

                </div>

                <div>

                    <p className="text-sm text-muted-foreground mb-2">
                        Closing Time
                    </p>

                    <TimePicker
                        value={formData.closingTime}
                        onChange={(type, value) => {
                            setFormData(prev => ({
                                ...prev,
                                closingTime: {
                                    ...prev.closingTime,
                                    [type]: value
                                }
                            }))
                        }}
                    />

                </div>

            </div>

            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                Pricing
            </h3>

            <div className="grid grid-cols-2 gap-4">

                <Input name="indianAdult" value={formData.indianAdult} placeholder="Indian Adult" onChange={handlePricingChange} />
                <Input name="indianStudent" value={formData.indianStudent} placeholder="Indian Student" onChange={handlePricingChange} />

                <Input name="foreignerAdult" value={formData.foreignerAdult} placeholder="Foreigner Adult" onChange={handlePricingChange} />
                <Input name="foreignerStudent" value={formData.foreignerStudent} placeholder="Foreigner Student" onChange={handlePricingChange} />

            </div>

            <div
                {...getRootProps()}
                className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition"
            >

                <input {...getInputProps()} />

                <p className="text-sm text-muted-foreground">
                    {images.length === 0
                        ? "Click to select images"
                        : `${images.length}/5 images selected`}
                </p>

                <p className="text-xs text-muted-foreground">
                    Max 5 images
                </p>

            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">

                {images.map((img, index) => (

                    <div key={index} className="relative">

                        <img
                            src={img.preview}
                            alt="preview"
                            className="h-28 w-full object-cover rounded-md border border-zinc-700"
                        />

                        <button
                            type="button"
                            onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                            className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded"
                        >
                            Remove
                        </button>

                    </div>

                ))}

            </div>

            <Button className="w-full">
                {mode === "edit" ? "Update Place" : "Create Place"}
            </Button>

        </form>

    )

}

export default PlaceForm