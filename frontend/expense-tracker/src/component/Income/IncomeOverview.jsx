import React,{useEffect, useState} from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
import { LuPlus } from 'react-icons/lu';

const IncomeOverview = ({transactions,onAddIncome}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);

    setChartData(result);
    return () => {};
  }, [transactions]);
  
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Last 60 Days Income</h5>
          <p className="text-xs text-gray-400 mt=0.5">
            Track your income over the last 60 days to see how your earnings are
            trending.
          </p>
        </div>
        <button onClick={onAddIncome} className="add-btn">
            <LuPlus className="text-lg"/>
          Add Income
        </button>
      </div>

      <div className="mt-10">
        { chartData && chartData.length > 0 ? (
          <CustomBarChart data={chartData}/>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No income data available. Start by adding your first income.
          </p>
        )}
        </div>

      {/* <div className="mt-10">
      <CustomBarChart data={chartData}/>
      </div> */}
    </div>
  );
}

export default IncomeOverview