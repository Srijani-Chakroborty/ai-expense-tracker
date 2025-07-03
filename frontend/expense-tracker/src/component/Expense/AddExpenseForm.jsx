import React,{useState} from 'react'
import Input from '../Inputs/input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {
    const [income, setIncome] = useState({
        category:'',
        amount:'',
        date:'',
        icon:''
    })

    const handleChange = (k,v) =>setIncome({...income, [k]:v})
  return (
    <div className=''>
        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />

        <Input
        value ={income.category}
        onChange={(e) => handleChange('category', e.target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc."
        type="text"
        required
        />
        <Input
        value ={income.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        required
        />
        <Input
        value ={income.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label="Date"
        placeholder="Freelance, Salary, etc."
        type="date"
        required
        />
        
        <div className='flex justify-end mt-6'>
            <button type="button"
            className='add-btn add-btn-fill'
            onClick={()=>onAddExpense(income)}>
                Add Expense
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm;