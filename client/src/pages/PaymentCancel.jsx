import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "@/utils/constants";

export default function PaymentCancel() {
    const navigate = useNavigate();

    useEffect(() => {
        const clearSession = async () => {
            await fetch(BASE_URL + "/chatbot/session", {
                method: "DELETE",
                credentials: "include",
            });
        };

        clearSession();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-base-200 to-base-300 px-4">
            <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="text-red-500 text-5xl mb-4">
                    ❌
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-2">
                    Payment Failed
                </h1>

                {/* Description */}
                <p className="text-base-content/70 mb-6">
                    Your payment was not completed.
                    Please try again to confirm your booking.
                </p>

                {/* Buttons */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-outline"
                    >
                        Go Home
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>

            </div>
        </div>
    );
}