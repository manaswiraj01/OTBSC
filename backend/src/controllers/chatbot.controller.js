import ChatbotSession from "../models/chatbotSessionModal.js";
import Place from "../models/placeModel.js";
import Booking from "../models/bookingModel.js";

function getMinBookingDate() {

    const now = new Date();

    const cutoff = new Date();
    cutoff.setHours(12, 0, 0, 0); // 12 PM cutoff

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (now >= cutoff) {
        today.setDate(today.getDate() + 1);
    }

    return today;
}

export const handleChatbotStep = async (req, res) => {
    try {
        const { action, value } = req.body || {};
        const userId = req.user._id;

        let session = await ChatbotSession.findOne({
            user: userId,
            isActive: true,
        });

        if (!session) {
            session = await ChatbotSession.create({ user: userId });
        }

        // =============================
        // DISCARD (FULL RESET)
        // =============================
        if (action === "DISCARD") {

            await ChatbotSession.deleteOne({
                user: userId,
                isActive: true,
            });

            return res.json({
                message: "Booking discarded successfully.",
                options: ["Book Ticket"],
                step: "GREETING",
            });
        }

        switch (session.currentStep) {

            // =============================
            // GREETING
            // =============================
            case "GREETING": {

                if (!value) {
                    return res.json({
                        message: "Welcome to OTBSC 👋 What would you like to do?",
                        options: ["Book Ticket"],
                        step: "GREETING",
                    });
                }

                if (value === "Book Ticket") {
                    session.currentStep = "STATE_SELECTION";
                    await session.save();
                }

                const states = await Place.distinct("state");

                return res.json({
                    message: "Please select a state",
                    options: states,
                    discardOption: true,
                    step: "STATE_SELECTION",
                });
            }

            // =============================
            // STATE SELECTION
            // =============================
            case "STATE_SELECTION": {

                if (!value) {
                    const states = await Place.distinct("state");

                    return res.json({
                        message: "Please select a state",
                        options: states,
                        discardOption: true,
                        step: "STATE_SELECTION",
                    });
                }

                session.selectedState = value;
                session.currentStep = "CITY_SELECTION";
                await session.save();

                const cities = await Place.distinct("city", { state: value });

                return res.json({
                    message: `Select a city in ${value}`,
                    options: cities,
                    discardOption: true,
                    step: "CITY_SELECTION",
                });
            }

            // =============================
            // CITY SELECTION
            // =============================
            case "CITY_SELECTION": {
                if (!value) {
                    if (!session.selectedState) {
                        session.currentStep = "STATE_SELECTION";
                        await session.save();

                        const states = await Place.distinct("state");

                        return res.json({
                            message: "Please select a state",
                            options: states,
                            discardOption: true,
                            step: "STATE_SELECTION",
                        });
                    }

                    const cities = await Place.distinct("city", {
                        state: session.selectedState,
                    });

                    return res.json({
                        message: `Select a city in ${session.selectedState}`,
                        options: cities,
                        discardOption: true,
                        step: "CITY_SELECTION",
                    });
                }

                // save city
                session.selectedCity = value;
                session.selectedCategory = null;
                session.selectedPlace = null;
                session.currentStep = "CATEGORY_SELECTION";
                await session.save();

                // 🔥 dynamic categories for selected city only
                const categories = await Place.distinct("category", {
                    state: session.selectedState,
                    city: value,
                });

                return res.json({
                    message: `Choose a category`,
                    options: categories,
                    discardOption: true,
                    step: "CATEGORY_SELECTION",
                });
            }

            // =============================
            // CATEGORY SELECTION
            // =============================
            case "CATEGORY_SELECTION": {
                if (!value) {
                    const categories = await Place.distinct("category", {
                        state: session.selectedState,
                        city: session.selectedCity,
                    });

                    return res.json({
                        message: "Choose a category",
                        options: categories,
                        discardOption: true,
                        step: "CATEGORY_SELECTION",
                    });
                }

                // save category
                session.selectedCategory = value;
                session.selectedPlace = null;
                session.currentStep = "PLACE_SELECTION";
                await session.save();

                // fetch places only for selected city + category
                const placeDocs = await Place.find({
                    state: session.selectedState,
                    city: session.selectedCity,
                    category: value,
                }).select("_id name");

                // ❌ if no places, don't go forward
                if (!placeDocs.length) {
                    const categories = await Place.distinct("category", {
                        state: session.selectedState,
                        city: session.selectedCity,
                    });

                    // reset step back
                    session.selectedCategory = null;
                    session.currentStep = "CATEGORY_SELECTION";
                    await session.save();

                    return res.json({
                        message: `No places found under "${value}" in ${session.selectedCity}. Please choose another category.`,
                        options: categories,
                        discardOption: true,
                        step: "CATEGORY_SELECTION",
                    });
                }

                return res.json({
                    message: "Select a place",
                    options: placeDocs.map((p) => ({
                        label: p.name,
                        value: p._id,
                    })),
                    discardOption: true,
                    step: "PLACE_SELECTION",
                });
            }

            case "PLACE_SELECTION": {

                if (!value) {
                    const placeDocs = await Place.find({
                        state: session.selectedState,
                        city: session.selectedCity,
                        category: session.selectedCategory,
                    }).select("_id name");

                    return res.json({
                        message: "Select a place",
                        options: placeDocs.map(p => ({
                            label: p.name,
                            value: p._id,
                        })),
                        discardOption: true,
                        step: "PLACE_SELECTION",
                    });
                }

                session.selectedPlace = value;
                session.currentStep = "TICKET_SELECTION";
                await session.save();

                const selectedPlaceDoc = await Place.findById(value);

                if (!selectedPlaceDoc) {
                    return res.status(400).json({
                        message: "Invalid place selected.",
                    });
                }

                return res.json({
                    message: `Select tickets for ${selectedPlaceDoc.name}`,
                    pricing: selectedPlaceDoc.pricing,
                    discardOption: true,
                    step: "TICKET_SELECTION",
                });
            }

            case "TICKET_SELECTION": {

                if (!value || typeof value !== "object") {
                    const ticketPlaceDoc = await Place.findById(session.selectedPlace);

                    return res.json({
                        message: `Select tickets for ${ticketPlaceDoc?.name || ""}`,
                        pricing: ticketPlaceDoc?.pricing || null,
                        discardOption: true,
                        step: "TICKET_SELECTION",
                    });
                }

                // 🔥 ADD THIS LINE
                const { visitDate, tickets } = value;

                if (!visitDate || !tickets || !tickets.length) {
                    return res.status(400).json({
                        message: "Visit date and ticket details are required",
                    });
                }

                // 🔥 DATE VALIDATION
                const selectedVisitDate = new Date(visitDate);
                selectedVisitDate.setHours(0, 0, 0, 0);

                const minDate = getMinBookingDate();

                if (selectedVisitDate < minDate) {
                    return res.status(400).json({
                        message: "Booking for today has closed at 12 PM. Please select tomorrow."
                    });
                }

                const ticketPlaceDoc = await Place.findById(session.selectedPlace);

                if (!ticketPlaceDoc) {
                    return res.status(400).json({
                        message: "Invalid place.",
                    });
                }

                let totalAmount = 0;
                const calculatedTickets = [];

                for (let t of tickets) {

                    let price = 0;

                    if (t.nationality === "Indian") {
                        price =
                            t.type === "Adult"
                                ? ticketPlaceDoc.pricing.indianAdult
                                : ticketPlaceDoc.pricing.indianStudent;
                    } else {
                        price =
                            t.type === "Adult"
                                ? ticketPlaceDoc.pricing.foreignerAdult
                                : ticketPlaceDoc.pricing.foreignerStudent;
                    }

                    calculatedTickets.push({
                        visitorType: `${t.nationality} ${t.type}`,
                        quantity: t.quantity,
                        price: price * t.quantity,
                    });

                    totalAmount += price * t.quantity;
                }

                session.visitDate = selectedVisitDate;
                session.tickets = calculatedTickets;
                session.totalAmount = totalAmount;
                session.currentStep = "CONFIRM_BOOKING";

                await session.save();

                return res.json({
                    message: "Please confirm your booking",
                    bookingSummary: {
                        place: ticketPlaceDoc.name,
                        city: ticketPlaceDoc.city,
                        state: ticketPlaceDoc.state,
                        visitDate,
                        tickets: calculatedTickets,
                        totalAmount,
                    },
                    options: ["Confirm Booking", "Discard Booking"],
                    step: "CONFIRM_BOOKING",
                });
            }

            default: {
                session.currentStep = "GREETING";
                await session.save();

                return res.json({
                    message: "Restarting chatbot...",
                    options: ["Book Ticket"],
                    step: "GREETING",
                });
            }
        }

    } catch (error) {
        console.error("Chatbot Error:", error);
        return res.status(500).json({ message: "Chatbot flow failed" });
    }
};

export const deleteSession = async (req, res) => {
    await ChatbotSession.deleteMany({ user: req.user.id });
    res.json({ message: "Session cleared" });
};