import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  console.log("Total Balance:", totalBalance);
  console.log("Balance Data:", balanceData);
  return (
    <div className="card flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full">
        <h5 className="text-lg">Financial Overview</h5>
      </div>
      <div className="flex items-center justify-center w-full h-full min-h-[300px]">
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`$${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </div>
  );
};

export default FinanceOverview;
