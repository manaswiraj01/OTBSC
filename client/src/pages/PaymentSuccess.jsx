import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "@/utils/constants";

export default function PaymentSuccess() {
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

      const res = await fetch(
        `${BASE_URL}/payment/verify-session?session_id=${sessionId}&type=success`
      );

      const data = await res.json();

      if (!data.valid) {
        navigate("/");
        return;
      }

      setLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    };

    verify();
  }, []);

  if (loading) return <div>Verifying Payment...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl text-green-500 font-bold">
        Payment Successful 🎉
      </h1>
    </div>
  );
}