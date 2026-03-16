import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import usePlaces from "../../hooks/usePlaces";
import Pagination from "../../components/Pagination";
import { SearchBar } from "../../components/common/SearchBar";

import PlaceCard from "@/components/places/PlaceCard";
import DeletePlaceModal from "@/components/places/DeletePlaceModal";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup
} from "@/components/ui/select";

const Places = () => {

    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const [stats, setStats] = useState({
        total: 0,
        museum: 0,
        wildlife: 0,
        monument: 0
    });

    const {
        places,
        total,
        handleDelete
    } = usePlaces(page, limit, search, category);

    const openDeleteModal = (place) => {
        setSelectedPlace(place);
        setDeleteOpen(true);
    };

    const confirmDelete = async () => {

        if (!selectedPlace) return;

        await handleDelete(selectedPlace);

        setDeleteOpen(false);
        setSelectedPlace(null);

    };

    useEffect(() => {

        if (!places.length) return

        const museumCount = places.filter(p => p.category === "Museum").length
        const wildlifeCount = places.filter(p => p.category === "Wildlife").length
        const monumentCount = places.filter(p => p.category === "Monument").length

        setStats({
            total: places.length,
            museum: museumCount,
            wildlife: wildlifeCount,
            monument: monumentCount
        })

    }, [places])

    return (

        <div className="space-y-8">
            {/* CONTROLS ROW */}
            <div className="flex items-center justify-between flex-wrap gap-4">

                <div className="flex items-center gap-4">

                    <SearchBar
                        search={search}
                        setSearch={(value) => {
                            setSearch(value);
                            setPage(1);
                        }}
                    />

                    {/* CATEGORY FILTER */}
                    <Select
                        value={category}
                        onValueChange={(value) => {
                            setCategory(value === "all" ? "" : value);
                            setPage(1);
                        }}
                    >

                        <SelectTrigger className="w-45 h-9 text-sm bg-zinc-900 border-zinc-700">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>

                        <SelectContent position="popper" className="bg-zinc-900 border-zinc-700 focus:outline-none focus:ring-0 focus:ring-offset-0">
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Museum">Museum</SelectItem>
                                <SelectItem value="Wildlife">Wildlife</SelectItem>
                                <SelectItem value="Monument">Monument</SelectItem>
                            </SelectGroup>
                        </SelectContent>

                    </Select>

                </div>


                <Button
                    className="px-5"
                    onClick={() => navigate("/dashboard/places/add")}
                >
                    + Add Place
                </Button>

            </div>


            {/* PLACES GRID */}
            {places.length === 0 ? (

                <div className="text-center py-20 text-muted-foreground">
                    No places found
                </div>

            ) : (

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                    {places.map((place) => (
                        <PlaceCard
                            key={place._id}
                            place={place}
                            onDelete={openDeleteModal}
                        />
                    ))}

                </div>

            )}


            {/* PAGINATION */}
            <Pagination
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                total={total}
            />


            {/* DELETE MODAL */}
            <DeletePlaceModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={confirmDelete}
                place={selectedPlace}
            />

        </div>

    );

};

export default Places;