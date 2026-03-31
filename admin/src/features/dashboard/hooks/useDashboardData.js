import { useEffect, useState } from "react";
import { getDashboardDataApi } from "../services/dashboard.api";

const useDashboardData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const res = await getDashboardDataApi();

            setData(res.data);
            setError(null);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchDashboard
    };
};

export default useDashboardData;