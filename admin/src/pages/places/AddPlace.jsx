import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addPlace } from "@/api/place.api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import PlaceForm from "@/components/places/PlaceForm"

const AddPlace = () => {

    const navigate = useNavigate()

    const handleSubmit = async (data) => {

        try {

            await addPlace(data)

            toast.success("Place added successfully")

            navigate("/dashboard/places")

        } catch (err) {

            console.log(err.response?.data)

            toast.error(err.response?.data?.message || "Failed to add place")

        }

    }

    return (

        <div className="flex justify-center p-6">

            <Card className="w-full max-w-4xl bg-zinc-900 border-zinc-800">

                <CardHeader>
                    <CardTitle>Add Place</CardTitle>
                </CardHeader>

                <CardContent>

                    <PlaceForm
                        mode="add"
                        onSubmit={handleSubmit}
                    />

                </CardContent>

            </Card>

        </div>

    )

}

export default AddPlace