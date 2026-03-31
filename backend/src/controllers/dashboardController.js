import { getDashboardDataService } from "../services/dashboardService.js";

export const getDashboardData = async (req, res) => {
  try {
    const data = await getDashboardDataService();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data"
    });
  }
};