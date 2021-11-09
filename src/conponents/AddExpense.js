import React, { useState } from 'react';
import history from '../utils/history';
import {IsValidField} from  './IsValidField';
import { useLocalStorage } from './UseLocalStorage';


import "../css/addExpense.css";

const AddExpense = (props) => {
    const [field, setField] = useLocalStorage('listArrayExpenses');

    const [isValid, setIsValid] = useState(false);

    const [date, setDate] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    const expenseObject = {
        date,
        amount,
        category
    };

    const isValidObject = Object.entries(expenseObject).length !== 0 && expenseObject.date.length && expenseObject.amount !== 0 && expenseObject.category !== '';

    const options = {day: 'numeric',  month: 'numeric'};

    function setValue(event) {
        if (event.target.id === "date" && event.target.value.length) {
            let date = new Date(event.target.value).toLocaleDateString("en-US", options);
            expenseObject.date = setDate(date);
        }
        if (event.target.id === "amount") {
            let value = ((+event.target.value).toFixed(2));
            expenseObject.amount = setAmount(value);
        }
        if (event.target.id === "category" && event.target.value !== '' ) {
            expenseObject.category = setCategory(event.target.value);
        }
    }

    function onHandleClick(event) {
        setIsValid(true);
        if (isValidObject && event.target.id === "button_add_expense") {
            setField(expenseObject);
            history.push("/expenses");
        } else if (event.target.id === "button_back_to_expenses") {
                history.push("/expenses");
        }
    }

    return (
        <div className="addExpense">
            <div className="addExpense-header">
                <button className="button-Back-To-Expenses" id="button_back_to_expenses" onClick={onHandleClick}>Cancel
                    {/* <img src="../img/icons/arrow-left2.svg" /> */}
                </button>
                <span className="add-income-title">Add Expense</span>
                <button className="button-Add-Expense" id="button_add_expense" onClick={onHandleClick}>Add</button>
            </div>
            <div className="input-title">DATE</div>
            <input id="date" placeholder="Select date" type="date" onChange={setValue} />
            {!date && isValid? <IsValidField/>:''}
            <div className="input-title">AMOUNT</div>
            <input type="number" id="amount" placeholder="Amount expense" onChange={setValue} />
            {!amount && isValid? <IsValidField/>:''}
            <div className="input-title">CATEGORY</div>
            <select id="category" onChange={setValue}>
                <option >Enter category</option>
                <option value="House">House</option>
                <option value="Food">Food</option>
                <option value="Family">Family</option>
                <option value="Transport">Transport</option>
                <option value="Health">Health</option>
                <option value="Beauty">Beauty</option>
                <option value="Rest">Rest</option>
                <option value="Other">Other</option>
                <option value="All budget">All budget</option>
            </select>
            {!category && isValid? <IsValidField/>:''}
            {/* <button className="button-Add-Expense" id="button_add_expense" onClick={onHandleClick}>ADD</button> */}
        </div>
    );
}

export { AddExpense };