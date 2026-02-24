import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "@/utils/constants";

export default function PaymentCancel() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            const sessionId = searchParams.get("session_id");

            if (!sessionId) {
                navigate("/");
                return;
            }

            try {
                const res = await fetch(
                    `${BASE_URL}/payment/verify-session?session_id=${sessionId}&type=cancel`
                );

                const data = await res.json();

                if (!data.valid) {
                    navigate("/");
                    return;
                }

                // Optional: clear chatbot session
                await fetch(BASE_URL + "/chatbot/session", {
                    method: "DELETE",
                    credentials: "include",
                });

                setLoading(false);

                setTimeout(() => {
                    navigate("/");
                }, 5000);

            } catch (err) {
                navigate("/");
            }
        };

        verify();
    }, []);

    if (loading) return <div className="text-center mt-10">Verifying...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-base-200 to-base-300 px-4">
            <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                <div className="text-red-500 text-5xl mb-4">
                    ❌
                </div>

                <h1 className="text-2xl font-bold mb-2">
                    Payment Cancelled
                </h1>

                <p className="text-base-content/70 mb-2">
                    Your payment was not completed.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="btn btn-outline"
                >
                    Go Home Now
                </button>

            </div>
        </div>
    );
}