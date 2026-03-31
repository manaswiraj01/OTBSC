import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import Place from "../models/placeModel.js";

export const getDashboardDataService = async () => {
    const today = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(today.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    // 🔥 Today's range
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 🔥 Revenue logic:
    // Count all paid bookings unless refunded
    const revenueMatch = {
        paymentStatus: "Paid",
        refundStatus: { $ne: "Refunded" }
    };

    // 🔹 Parallel queries
    const [
        totalUsers,
        totalBookings,
        totalPlaces,
        revenueResult,
        pendingRefunds,
        recentBookings,
        bookingsByDate,
        topCities,
        revenueByMonth,
        bookingStatusData,
        todayBookings,
        todayRevenueResult,
        todayCancelled,
        topPlaceResult,
        categoryBreakdown,
        categoryPlaceCount
    ] = await Promise.all([
        // Users count
        User.countDocuments(),

        // Bookings count
        Booking.countDocuments(),

        // Places count
        Place.countDocuments(),

        // 💰 Total Revenue (Paid - Refunded)
        Booking.aggregate([
            {
                $match: revenueMatch
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]),

        // Pending refund requests
        Booking.countDocuments({ refundStatus: "Pending" }),

        // Recent bookings
        Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("userId", "name email")
            .populate("placeId", "name city"),

        // 📈 Booking trends (last 7 days)
        Booking.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: sevenDaysAgo
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                            timezone: "Asia/Kolkata"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]),

        // 🏙️ Top cities
        Booking.aggregate([
            {
                $group: {
                    _id: "$city",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]),

        // 💰 Revenue trends (last 12 months)
        Booking.aggregate([
            {
                $match: {
                    ...revenueMatch,
                    createdAt: { $gte: twelveMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: {
                                date: "$createdAt",
                                timezone: "Asia/Kolkata"
                            }
                        },
                        month: {
                            $month: {
                                date: "$createdAt",
                                timezone: "Asia/Kolkata"
                            }
                        }
                    },
                    revenue: { $sum: "$totalAmount" },
                    bookings: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]),

        // 🔥 Booking status breakdown
        Booking.aggregate([
            {
                $group: {
                    _id: "$bookingStatus",
                    count: { $sum: 1 }
                }
            }
        ]),

        // 🔥 Today's bookings
        Booking.countDocuments({
            createdAt: {
                $gte: todayStart,
                $lte: todayEnd
            }
        }),

        // 💰 Today's revenue (today paid bookings, unless refunded)
        Booking.aggregate([
            {
                $match: {
                    ...revenueMatch,
                    createdAt: {
                        $gte: todayStart,
                        $lte: todayEnd
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }
            }
        ]),

        Booking.countDocuments({
            bookingStatus: "Cancelled",
            cancelledAt: {
                $gte: todayStart,
                $lte: todayEnd
            }
        }),

        // 🏆 Top performing place by revenue
        Booking.aggregate([
            {
                $match: revenueMatch
            },
            {
                $group: {
                    _id: "$placeId",
                    totalRevenue: { $sum: "$totalAmount" },
                    totalBookings: { $sum: 1 },
                    fallbackName: { $first: "$name" }
                }
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "places",
                    localField: "_id",
                    foreignField: "_id",
                    as: "place"
                }
            },
            {
                $unwind: {
                    path: "$place",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    resolvedPlaceName: {
                        $ifNull: ["$place.name", "$fallbackName"]
                    }
                }
            }
        ]),

        // 🔥 Category breakdown
        Booking.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $match: {
                    _id: { $ne: null }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 6 }
        ]),

        // 🔥 Category-wise place count
        Place.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $match: {
                    _id: { $ne: null }
                }
            },
            { $sort: { count: -1 } }
        ])
    ]);

    // 🔥 Safe booking labels for chart
    const bookingTrend = bookingsByDate.map((item) => {
        const [year, month, day] = item._id.split("-");
        const safeDate = new Date(`${year}-${month}-${day}T00:00:00+05:30`);

        return {
            ...item,
            label: safeDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
            }),
        };
    });

    // 🔥 Fill missing months so chart never breaks
    const revenueMap = new Map();

    revenueByMonth.forEach((item) => {
        const key = `${item._id.year}-${item._id.month}`;
        revenueMap.set(key, {
            revenue: item.revenue,
            bookings: item.bookings
        });
    });

    const revenueTrend = [];

    for (let i = 0; i < 12; i++) {
        const date = new Date(twelveMonthsAgo);
        date.setMonth(twelveMonthsAgo.getMonth() + i);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;

        const existing = revenueMap.get(key);

        revenueTrend.push({
            month: date.toLocaleString("en-IN", { month: "short" }),
            fullMonth: date.toLocaleString("en-IN", {
                month: "long",
                year: "numeric"
            }),
            revenue: existing?.revenue || 0,
            bookings: existing?.bookings || 0
        });
    }

    // 🔥 Normalize booking status
    const statusMap = {
        Booked: 0,
        Cancelled: 0,
        Completed: 0
    };

    bookingStatusData.forEach((item) => {
        if (statusMap[item._id] !== undefined) {
            statusMap[item._id] = item.count;
        }
    });

    return {
        stats: {
            totalUsers,
            totalBookings,
            totalPlaces,
            revenue: revenueResult[0]?.totalRevenue || 0,
            pendingRefunds
        },

        trends: {
            bookings: bookingTrend,
            revenue: revenueTrend
        },

        topCities,
        categoryBreakdown,
        categoryPlaceCount,

        bookingStatus: [
            { name: "Booked", value: statusMap.Booked },
            { name: "Cancelled", value: statusMap.Cancelled },
            { name: "Completed", value: statusMap.Completed }
        ],

        insights: {
            todayBookings,
            todayRevenue: todayRevenueResult[0]?.total || 0,
            todayCancelled,
            pendingRefunds,
            topCity: topCities[0]?._id || "N/A",
            topPlace: topPlaceResult[0]?.resolvedPlaceName || "N/A",
            topPlaceRevenue: topPlaceResult[0]?.totalRevenue || 0
        },

        recentActivity: recentBookings
    };
};