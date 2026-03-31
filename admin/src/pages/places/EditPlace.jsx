import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getPlaceById } from "@/api/place.api"

import PlaceForm from "@/components/places/PlaceForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"
import usePlaces from "@/hooks/usePlaces"
import PageLoader from "@/components/common/PageLoader"

const EditPlace = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [place, setPlace] = useState(null)
    const [loading, setLoading] = useState(true)

    const { editPlace } = usePlaces()

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const res = await getPlaceById(id)
                setPlace(res.data.data)
            } catch (err) {
                toast.error("Failed to load place details")
            } finally {
                setLoading(false)
            }
        }

        fetchPlace()
    }, [id])

    const handleSubmit = async (data) => {

        const res = await editPlace(id, data);

        if (res.success) {
            toast.success("Place updated successfully ✅")
            navigate("/dashboard/places")
        } else {
            toast.error(
                res.error?.response?.data?.errors?.description?.message ||
                res.error?.response?.data?.message ||
                "Update failed ❌"
            )
        }
    }

    if (loading || !place) {
        return <PageLoader text="Fetching place details..." />
    }

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