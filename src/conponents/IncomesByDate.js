import React, { useState, useEffect } from 'react';
import { List } from './List';
import history from '../utils/history';
import { Calendar } from './Calendar';
import "../css/incomesByDate.css";
import "../css/totalBalance.css";


const IncomesByDate = () => {

    const [incomesSum, setIncomesSum] = useState(0);
    const [month, getMonth] =  useState(0);//вынести в отдельную функцию, либо же переписать по-другому

    let listArrayIncomes = JSON.parse(localStorage.getItem("listArrayIncomes"));

    function getIncomeSum() {
        let incomesSum = listArrayIncomes && listArrayIncomes.length ? listArrayIncomes.reduce((acc, current) => acc + (+current.amount), 0) : 0;
        setIncomesSum(incomesSum.toFixed(2));
    };

    useEffect(() => {
        getIncomeSum();
    });

    function onHandleClick(event) {
        if (event.target.id === "main") {
            history.push("/");
        } else if (event.target.id === "add_income") {
            history.push("/add_income");
        }
    }
    // console.log(month);

    return (
        <div className="expenses">
            <div className="expense-header">
                <button className="redirectButton" id="main" onClick={onHandleClick}>main</button> 
                <span className="add-income-title">Income by date</span>
                <button className="redirectButton" id="add_income" onClick={onHandleClick}>Add</button>
            </div>
            <div className="expenses-total">
                {/* <input className="expenses-calendar" type="date" name="calendar" /> */}
                <Calendar getMonth={getMonth}/>
                <span>{incomesSum}</span>
            </div>
            <div className="expenses-statistics">
                {incomesSum ? <List array={listArrayIncomes} income={true} getIncomeSum={getIncomeSum} month={month}/> : ''}
            </div>
            {/* <button className="redirectButton" id="add_income" onClick={onHandleClick}>ADD INCOME</button> */}
        </div>
    )
}

export { IncomesByDate };