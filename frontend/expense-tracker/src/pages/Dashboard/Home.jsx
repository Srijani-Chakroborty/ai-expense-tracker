import React, { useEffect } from "react";
import DashboardLayout from "../../component/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstanse";
import { API_PATHS } from "../../utils/apiPaths";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../component/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import ExpenseTransactions from "../../component/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../component/Dashboard/Last30DaysExpenses";
import RecentTransactions from "../../component/Dashboard/RecentTransactions";
import FinanceOverview from "../../component/Dashboard/FinanceOverview";
import RecentIncomeWithChart from "../../component/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../component/Dashboard/RecentIncome";
import AIInsights from "../../component/Dashboard/AiInsights";
import { useInsights } from "../../context/InsightsContext";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { insights, setInsights, loadingInsights, setLoadingInsights } =
    useInsights();

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchAIInsights = async () => {
    setLoadingInsights(true);
    setInsights(null);
    try {
      const response = await axiosInstance.post(
        `${API_PATHS.INSIGHTS.GET_INSIGHTS}`
      );
      console.log("📦 AI Insights Response:", response.data);
      if (response.data?.insights) {
        setInsights(response.data.insights);
      }
    } catch (err) {
      console.error("Failed to fetch AI insights:", err);
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // fetchAIInsights(); // Remove auto-fetch on mount
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>
        {/* Gemini AI Insights Section */}
        <div className="my-6">
          <AIInsights
            insights={insights}
            loading={loadingInsights}
            onFetch={fetchAIInsights}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpenses={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses.transactions || []}
          />

          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
