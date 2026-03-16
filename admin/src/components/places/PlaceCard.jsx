import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { Pencil, Trash, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

const PlaceCard = ({ place, onDelete }) => {

  const navigate = useNavigate()

  return (

    <Card className="flex flex-col h-full bg-card border border-border shadow-md 
    hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group">

      {/* IMAGE */}
      <div className="relative h-56 w-full overflow-hidden -mt-6">

        <img
          src={place.photoUrls?.[0]}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 "
        />

        {/* CATEGORY BADGE */}
        <Badge
          className="absolute top-2 left-2 bg-background/80 backdrop-blur"
          variant="secondary"
        >
          {place.category}
        </Badge>

        {/* RATING BADGE */}
        <div className="absolute top-2 right-2 flex items-center gap-1 
        bg-background/80 backdrop-blur px-2 py-1 rounded-md 
        text-xs font-semibold text-yellow-500 shadow-sm">

          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />

          {place.rating?.average || 0}

        </div>

      </div>


      {/* CONTENT */}
      <CardContent className="pt-4 pb-2 space-y-1">

        <h3 className="font-semibold text-lg leading-tight">
          {place.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {place.city}, {place.state}
        </p>

      </CardContent>


      {/* ACTION BUTTONS */}
      <CardFooter className="flex gap-2 pt-3 mt-auto">

        {/* EDIT BUTTON */}
        <Button
          size="sm"
          className="flex-1 text-black 
          bg-white
          
          transition-all duration-200 shadow-sm"
          onClick={() => navigate(`/dashboard/places/edit/${place._id}`)}
        >
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>

        {/* DELETE BUTTON */}
        <Button
          size="sm"
          className="flex-1 text-white 
          bg-linear-to-r from-red-500 to-red-700
          hover:from-red-600 hover:to-red-800
          transition-all duration-200 shadow-sm"
          onClick={() => onDelete(place)}
        >
          <Trash className="w-4 h-4 mr-1" />
          Delete
        </Button>

      </CardFooter>

    </Card>

  )
}

export default PlaceCard