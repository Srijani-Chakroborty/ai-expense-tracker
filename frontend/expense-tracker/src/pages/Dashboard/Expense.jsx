import React, { useState,useEffect } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../component/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstanse'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../component/Modal'
import { toast } from 'react-hot-toast'
import ExpenseOverview from '../../component/Expense/ExpenseOverview'
import AddExpenseForm from '../../component/Expense/AddExpenseForm'
import ExpenseList from '../../component/Inputs/ExpenseList'
import DeleteAlert from '../../component/DeleteAlert'

const Expense = () => {
useUserAuth();
const [expenseData, setExpenseData] = useState([]);
const [loading, setLoading] = useState(false);
const [openDeleteAlert, setOpenDeleteAlert] = useState({
  show: false,
  data: null
});
const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

//fetch expense details
const fetchExpenseDetails = async () => {
if(loading) return;
setLoading(true);
try {
  // Fetch expense data from API
  const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSES}`);
  if (response.data) {
    setExpenseData(response.data);
  }
  
} catch (error) {
  console.error("Error fetching expense details:", error);
} finally {
  setLoading(false);
}
};

// Handle adding new expense
const handleAddExpense = async (expense) => {
const { category, amount, date, icon } = expense;

//validation checks
if(!category.trim()) {
  toast.error("Category is required");
  return;
}
if(!amount || isNaN(amount) || amount <= 0) {
  toast.error("Valid expense amount is required");
  return;
}
if(!date) {
  toast.error("Income date is required");
  return;
}

try{
  await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`, {
    category,
    amount,
    date,
    icon
  });
  setOpenAddExpenseModal(false);
  toast.success("Income added successfully");
  fetchExpenseDetails(); // Refresh expense data
}
catch(error)
{
  console.error("Error adding expense:", error);
  toast.error("Failed to add expense");
}
};


const deleteExpense = async (id) => {
  try{
    await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`);
    setOpenDeleteAlert({show:false, data:null});
    toast.success("Expense deleted successfully");
    fetchExpenseDetails(); // Refresh income data
  }
  catch(error) {
    console.error("Error deleting expense:", error);
    toast.error("Failed to delete expense");
  }
};
const handleDownloadExpenseDetails = async () => {
  try{
    const response = await axiosInstance.get(`${API_PATHS.EXPENSE.DOWNLOAD_EXPENSE}`, {
      responseType: 'blob' // Important for handling binary data
    });
    
    // Create a URL for the blob and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expense_details.xlsx'); // Specify file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // Clean up URL object
  }catch(error) {
    console.error("Error downloading expense details:", error);
    toast.error("Failed to download expense details");
  }
};


useEffect(() => {
  fetchExpenseDetails();
  return () => {};
}, []);


  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
          <ExpenseOverview
          transactions={expenseData}
          onExpenseIncome={()=>setOpenAddExpenseModal(true)}/>
        </div>
        <ExpenseList
        transactions={expenseData}
        onDelete={(id)=>{
          setOpenDeleteAlert({
            show:true,
            data:id
          });
        }}
        onDownload={handleDownloadExpenseDetails}/>
      </div>
      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>
        <Modal
      isOpen={openDeleteAlert.show}
      onClose={()=>setOpenDeleteAlert({show:false, data:null})}
      title="Delete Expense"
      >
        <DeleteAlert
        content="Are you sure you want to delete this expense?"
        onDelete={()=>deleteExpense(openDeleteAlert.data)}
        />
      </Modal>
        </div>
    </DashboardLayout>
  )
}

export default Expense