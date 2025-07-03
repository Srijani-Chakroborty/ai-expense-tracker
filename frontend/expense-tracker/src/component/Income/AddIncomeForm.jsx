import React, { useState } from 'react'
import Input from '../Inputs/input'
import EmojiPickerPopup from '../EmojiPickerPopup'
const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source:'',
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
        value ={income.source}
        onChange={(e) => handleChange('source', e.target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc."
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
            onClick={()=>onAddIncome(income)}>
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm