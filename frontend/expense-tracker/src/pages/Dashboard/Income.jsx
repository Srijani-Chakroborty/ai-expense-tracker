import React, { useEffect, useState } from "react";
import DashboardLayout from "../../component/layouts/DashboardLayout";
import IncomeOverview from "../../component/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstanse";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../component/Modal";
import AddIncomeForm from "../../component/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../component/Inputs/IncomeList";
import DeleteAlert from "../../component/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Fetch income data from API
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_INCOMES}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validation checks
    if (!source.trim()) {
      toast.error("Income source is required");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Valid income amount is required");
      return;
    }
    if (!date) {
      toast.error("Income date is required");
      return;
    }

    try {
      await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, {
        source,
        amount: parseFloat(amount),
        date,
        icon,
      });

      toast.success("Income added successfully");
      setOpenAddIncomeModal(false);
      fetchIncomeDetails(); // Refresh income data
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME(id)}`);
      toast.success("Income deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchIncomeDetails(); // Refresh income data
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.DOWNLOAD_INCOME}`,
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx"); // Specify file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up URL object
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
