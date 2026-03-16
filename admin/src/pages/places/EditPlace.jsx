import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getPlaceById, updatePlace } from "@/api/place.api"

import PlaceForm from "@/components/places/PlaceForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const EditPlace = () => {

    const { id } = useParams()

    const [place, setPlace] = useState(null)

    useEffect(() => {

        const fetchPlace = async () => {

            const res = await getPlaceById(id)

            setPlace(res.data.data)

        }

        fetchPlace()

    }, [])

    const handleSubmit = async (data) => {

        await updatePlace(id, data)

        alert("Place updated")

    }

    if (!place) return <div>Loading...</div>

    return (

        <div className="flex justify-center p-6">

            <Card className="w-full max-w-4xl bg-zinc-900 border-zinc-800">

                <CardHeader>
                    <CardTitle>Edit Place</CardTitle>
                </CardHeader>

                <CardContent>

                    <PlaceForm
                        mode="edit"
                        initialData={place}
                        onSubmit={handleSubmit}
                    />

                </CardContent>

            </Card>

        </div>
    )

}

export default EditPlace