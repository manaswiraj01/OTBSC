import ChatbotSession from "../models/chatbotSessionModal.js";
import Place from "../models/placeModel.js";
import Booking from "../models/bookingModel.js";

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
            session.currentStep = "GREETING";
            session.selectedState = null;
            session.selectedCity = null;
            session.selectedCategory = null;
            session.selectedPlace = null;
            session.visitDate = null;
            session.tickets = [];
            session.totalAmount = null;

            await session.save();

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

                session.selectedCity = value;
                session.currentStep = "CATEGORY_SELECTION";
                await session.save();

                return res.json({
                    message: "Choose a category",
                    options: ["Museum", "Wildlife", "Monument"],
                    discardOption: true,
                    step: "CATEGORY_SELECTION",
                });
            }

            // =============================
            // CATEGORY SELECTION
            // =============================
            case "CATEGORY_SELECTION": {

                if (!value) {
                    return res.json({
                        message: "Choose a category",
                        options: ["Museum", "Wildlife", "Monument"],
                        discardOption: true,
                        step: "CATEGORY_SELECTION",
                    });
                }

                session.selectedCategory = value;
                session.currentStep = "PLACE_SELECTION";
                await session.save();

                const placeDocs = await Place.find({
                    state: session.selectedState,
                    city: session.selectedCity,
                    category: value,
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

            // =============================
            // PLACE SELECTION
            // =============================
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

            // =============================
            // TICKET SELECTION
            // =============================
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

                const { visitDate, tickets } = value;

                if (!visitDate || !tickets || !tickets.length) {
                    return res.status(400).json({
                        message: "Visit date and ticket details are required",
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
                        visitorType: t.type,
                        quantity: t.quantity,
                        price,
                    });

                    totalAmount += price * t.quantity;
                }

                session.visitDate = new Date(visitDate);
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