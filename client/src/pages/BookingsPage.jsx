import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

import BookingFilters from "../components/BookingFilters";
import BookingStats from "../components/BookingStats";
import BookingTable from "../components/BookingTable";
import CancelBookingModal from "../components/CancelBookingModal";
import Pagination from "../components/Pagination";

const BookingsPage = () => {

    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [cancelBooking, setCancelBooking] = useState(null);

    const [month, setMonth] = useState("all");
    const [year, setYear] = useState("all");
    const [status, setStatus] = useState("all");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [limitOpen, setLimitOpen] = useState(false);
    const limitRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const total = filteredBookings.length;

    const paginatedBookings = filteredBookings.slice(
        (page - 1) * limit,
        page * limit
    );

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [month, year, status, bookings]);

    const fetchBookings = async () => {

        try {

            const { data } = await axios.get(
                BASE_URL + "/bookings/my",
                { withCredentials: true }
            );

            setBookings(data);
            setFilteredBookings(data);
            setLoading(false);

        } catch (err) {
            console.log(err);
            setLoading(false);
        }

    };

    const filterBookings = () => {

        let list = [...bookings];

        if (month !== "all") {
            list = list.filter(
                b => new Date(b.visitDate).getMonth() + 1 === Number(month)
            );
        }

        if (year !== "all") {
            list = list.filter(
                b => new Date(b.visitDate).getFullYear() === Number(year)
            );
        }

        if (status !== "all") {

            list = list.filter(b => {

                if (status === "completed") return b.bookingStatus === "Completed";
                if (status === "refunded") return b.refundStatus === "Refunded";
                if (status === "pending") return b.refundStatus === "Pending";
                if (status === "booked") return b.bookingStatus === "Booked";

                return true;

            });

        }

        setFilteredBookings(list);
        setPage(1);

    };

    const cancelBookingHandler = async () => {

        try {

            await axios.put(
                `${BASE_URL}/bookings/${cancelBooking._id}/cancel`,
                {},
                { withCredentials: true }
            );

            fetchBookings();
            setCancelBooking(null);

        } catch (err) {
            console.log(err);
        }

    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (

        <div className="min-h-screen py-10 px-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-center text-secondary mb-8">
                    My Bookings
                </h1>

                <BookingStats bookings={bookings} />

                <BookingFilters
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    status={status}
                    setStatus={setStatus}
                />

                <BookingTable
                    bookings={paginatedBookings}
                    openCancelModal={setCancelBooking}
                />

                <div className="px-2 sm:px-4">
                    <Pagination
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        total={total}
                        limitOpen={limitOpen}
                        setLimitOpen={setLimitOpen}
                        limitRef={limitRef}
                    />

                </div>

                <CancelBookingModal
                    booking={cancelBooking}
                    onClose={() => setCancelBooking(null)}
                    onConfirm={cancelBookingHandler}
                />

            </div>

        </div>

    );

};

export default BookingsPage;
