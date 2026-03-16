import React, { useState, useRef, useEffect } from "react";

const BookingFilters = ({
    month,
    setMonth,
    year,
    setYear,
    status,
    setStatus
}) => {

    const [monthOpen, setMonthOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);

    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const statusRef = useRef(null);

    const months = [
        { name: "Jan", value: 1 },
        { name: "Feb", value: 2 },
        { name: "Mar", value: 3 },
        { name: "Apr", value: 4 },
        { name: "May", value: 5 },
        { name: "Jun", value: 6 },
        { name: "Jul", value: 7 },
        { name: "Aug", value: 8 },
        { name: "Sep", value: 9 },
        { name: "Oct", value: 10 },
        { name: "Nov", value: 11 },
        { name: "Dec", value: 12 },
    ];

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (monthRef.current && !monthRef.current.contains(event.target)) {
                setMonthOpen(false);
            }

            if (yearRef.current && !yearRef.current.contains(event.target)) {
                setYearOpen(false);
            }

            if (statusRef.current && !statusRef.current.contains(event.target)) {
                setStatusOpen(false);
            }

        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, []);

    return (

        <div className="flex flex-wrap justify-end gap-3 mb-6">

            {/* MONTH */}

            <div ref={monthRef} className="relative">

                <button
                    onClick={() => {
                        setMonthOpen(!monthOpen);
                        setYearOpen(false);
                        setStatusOpen(false);
                    }}
                    className="bg-secondary text-secondary-content px-4 py-2 rounded-md"
                >
                    {month === "all"
                        ? "All Months"
                        : months.find(m => m.value === month)?.name}
                </button>

                {monthOpen && (

                    <div className="absolute left-0 mt-2 w-28 rounded-lg shadow-lg z-50
          bg-white text-black
          dark:bg-zinc-900 dark:text-white
          max-h-40 overflow-y-auto">

                        <div
                            onClick={() => { setMonth("all"); setMonthOpen(false); }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            All Months
                        </div>

                        {months.map((m) => (
                            <div
                                key={m.value}
                                onClick={() => { setMonth(m.value); setMonthOpen(false); }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                            >
                                {m.name}
                            </div>
                        ))}

                    </div>

                )}

            </div>

            {/* YEAR */}

            <div ref={yearRef} className="relative">

                <button
                    onClick={() => {
                        setYearOpen(!yearOpen);
                        setMonthOpen(false);
                        setStatusOpen(false);
                    }}
                    className="bg-secondary text-secondary-content px-4 py-2 rounded-md"
                >
                    {year === "all" ? "All Years" : year}
                </button>

                {yearOpen && (

                    <div className="absolute left-0 mt-2 w-28 rounded-lg shadow-lg z-50
          bg-white text-black
          dark:bg-zinc-900 dark:text-white
          max-h-40 overflow-y-auto">

                        <div
                            onClick={() => { setYear("all"); setYearOpen(false); }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            All Years
                        </div>

                        {[2024, 2025, 2026, 2027].map((y) => (
                            <div
                                key={y}
                                onClick={() => { setYear(y); setYearOpen(false); }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                            >
                                {y}
                            </div>
                        ))}

                    </div>

                )}

            </div>

            {/* STATUS */}

            <div ref={statusRef} className="relative">

                <button
                    onClick={() => {
                        setStatusOpen(!statusOpen);
                        setMonthOpen(false);
                        setYearOpen(false);
                    }}
                    className="bg-secondary text-secondary-content px-4 py-2 rounded-md"
                >
                    {status === "all"
                        ? "All Status"
                        : status === "booked"
                            ? "Booked"
                            : status === "completed"
                                ? "Completed"
                                : status === "pending"
                                    ? "Refund Pending"
                                    : "Refunded"}
                </button>

                {statusOpen && (

                    <div className="absolute left-0 mt-2 w-28 rounded-lg shadow-lg z-50
  bg-white text-black
  dark:bg-zinc-900 dark:text-white
  max-h-40 overflow-y-auto">

                        <div
                            onClick={() => { setStatus("all"); setStatusOpen(false); }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            All Status
                        </div>

                        <div
                            onClick={() => { setStatus("booked"); setStatusOpen(false); }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            Booked
                        </div>

                        <div
                            onClick={() => { setStatus("completed"); setStatusOpen(false); }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            Completed
                        </div>

                        <div
                            onClick={() => { setStatus("pending"); setStatusOpen(false); }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            Pending
                        </div>

                        <div
                            onClick={() => { setStatus("refunded"); setStatusOpen(false); }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            Refunded
                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};

export default BookingFilters;