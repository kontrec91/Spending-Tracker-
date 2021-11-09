import React, {useState, useEffect} from 'react';
import { List } from './List';
import history from '../utils/history';


const Expenses = () => {
    const [expensesSum, setExpensesSum] = useState(0);

    let listArrayExpenses = JSON.parse(localStorage.getItem("listArrayExpenses"));

    function getExpensesSum() {
        let expensesSum = listArrayExpenses && listArrayExpenses.length ? listArrayExpenses.reduce((acc, current) => acc + (+current.amount), 0) : 0;
        setExpensesSum(expensesSum.toFixed(2));
    };
    
    useEffect(() => {
        getExpensesSum();
    });

    function onHandleClick(event) {
        if (event.target.id === "main") {
            history.push("/");
        } else if (event.target.id === "add_income") {
            history.push("/add_expense");
        } else if(event.target.id === "diagram"){
            history.push("/pie_diagram");
        }
    }

    return (
        <div className="expenses">
            <div className="expense-header">
                <button className="redirectButton" id="main" onClick={onHandleClick}>main</button> 
                Expenses
                <button className="button-Back-To-Expenses" id="diagram" onClick={onHandleClick}>diagram</button></div>
            <div className="expenses-total">
                <input className="expenses-calendar" type="date" name="calendar" />
                <span>{expensesSum}</span>
            </div>
            <div className="expenses-statistics">
                {expensesSum ? <List array={listArrayExpenses} getExpensesSum={getExpensesSum}/> : ''}
            </div>
            <button className="redirectButton" id="add_income" onClick={onHandleClick}>ADD EXPENSE</button>
        </div>
    )
}

export { Expenses };