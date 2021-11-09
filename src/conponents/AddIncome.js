import React, { useState } from 'react';
import history from '../utils/history';
import { IsValidField } from './IsValidField';
import { useLocalStorage } from './UseLocalStorage';

import "../css/addExpense.css";


const AddIncome = (props) => {
    const [isValid, setIsValid] = useState(false);

    const [field, setField] = useLocalStorage('listArrayIncomes');
    //работает деструктуризация, -- field=init, setData=setInitValue


    const [date, setDate] = useState('');
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState('');

    // field(incomeObject)

    const incomeObject = {
        date,
        name,
        amount
    };


    const isValidObject = Object.entries(incomeObject).length !== 0 && incomeObject.date.length && incomeObject.amount !== 0 && incomeObject.name !== '';

    const options = {day: 'numeric',  month: 'numeric'};



    function setValue(event) {
        if (event.target.id === "date" && event.target.value.length) {
            let date = new Date(event.target.value).toLocaleDateString("en-US", options);
            incomeObject.date = setDate(date);
        }
        if (event.target.id === "amount") {
            let value = ((+event.target.value).toFixed(2));
            incomeObject.amount = setAmount(value);
        }
        if (event.target.id === "name" && event.target.value !== '' ) {
            incomeObject.name = setName(event.target.value);
        }
    }

    function onHandleClick(event) {
        setIsValid(true);
        if (isValidObject && event.target.id === "button_add_expense") {
            setField(incomeObject);
            history.push("/incomes_by_date");
        } else if (event.target.id === "button_back_to_expenses") {
                history.push("/incomes_by_date");
        }
    }


    return (
        <div className="addExpense">
            <div className="addExpense-header">
                <button className="button-Back-To-Expenses" id="button_back_to_expenses" onClick={onHandleClick} >Cancel
                    {/* <img src="../img/icons/arrow-left2.svg" /> &#8592;*/}
                </button>
                <span className="add-income-title">Add income</span>
                <button className="button-Add-Expense" id="button_add_expense" onClick={onHandleClick} >Add</button>
            </div>
            <div className="input-title">NAME</div>
            <input id="name" onChange={setValue} />
            {!name && isValid? <IsValidField /> : null}
            {/* <IsValidField style={{ display: false? 'flex' : 'none' }}/> */}
            <div className="input-title">AMOUNT</div>
            <input type="number" id="amount" onChange={setValue} />
            {!amount && isValid? <IsValidField/> : null}
            <div className="input-title">INFORMATION</div>
            <input id="date" placeholder="Date" type="date" onChange={setValue} />
            {!date && isValid? <IsValidField/> : null}
            {/* <button className="button-Add-Expense" id="button_add_expense" onClick={onHandleClick} >ADD</button> */}
        </div>
    );
}

export { AddIncome };