import React, { useState, useEffect } from 'react';
import history from '../utils/history';
import { TotalExpensesSettings } from "./TotalExpensesSettings";
import { Calendar } from './Calendar';
import "../css/totalBalance.css";

const TotalBalance = () => {

    const [expenses, setExpenses] = useState(0);
    const [income, setIncome] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);


    const [isModal, setIsModal] = useState(false);

    let listArrayExpenses = JSON.parse(localStorage.getItem("listArrayExpenses"));
    let listArrayIncomes = JSON.parse(localStorage.getItem("listArrayIncomes"));

    let expensesSum = listArrayExpenses && listArrayExpenses.length ? listArrayExpenses.reduce((acc, current) => acc + (+current.amount), 0) : 0;
    let incomeSum = listArrayIncomes && listArrayIncomes.length ? listArrayIncomes.reduce((acc, current) => acc + (+current.amount), 0) : 0;
    let totalBalanceSum = incomeSum - expensesSum;

    // function one (numb){
    //     return numb.toFixed(2);
    // }

    useEffect(() => {
        debugger
        setExpenses(expensesSum.toFixed(2));
        // setExpenses(one(expensesSum));
        setIncome(incomeSum.toFixed(2));
        setTotalBalance(totalBalanceSum.toFixed(2))
    }, [expensesSum, incomeSum, totalBalanceSum]);

    function onHandleClick(event) {
        if (event.target.id === "add_expense") {
            history.push("/add_expense");
        } else if (event.target.id === "add_income") {
            history.push("/add_income");
        }
    }

    function showTotalExpensesSettings(event) {
        if (event.target.id === "total-expenses-settings-button") {
            setIsModal(true);
        }
        else if (event.target.className === "total-expenses-settings") {
            setIsModal(false);
        }
    }

    return (
        <div className="totalBalance">
            <div className="totalBalance-header">
                <h3>Total Balance</h3>
                <div className="totalBalance-calendar">
                    {/* <span className="arrow-nav">&#12296;</span> */}
                    <Calendar />
                    {/* <span className="arrow-nav">&#12297;</span> */}
                </div>
                <p className="totalBalance-summ">{totalBalance}</p>
            </div>
            <div className="totalBalance-main">
                <div className="income">
                    <p className="income-title">INCOME</p>
                    <div className="income-total-sum">
                        <p>{income}</p><span className="arrow-nav">&#12297;</span>
                    </div>
                    <p className="income-previous-month-sum">+ 10,999.00 in previous month</p>
                </div>
                <hr />
                <div className="expenses">
                    <div className="expenses-bar">
                        <p className="expenses-title">EXPENSES</p>
                        <span id="total-expenses-settings-button" onClick={showTotalExpensesSettings}>&#8942;</span>
                    </div>
                    <div className="expenses-total-sum">
                        <p>{expenses}</p><span className="arrow-nav">&#12297;</span>
                    </div>
                    <p className="expenses-previous-month-sum">- 4,087.99 in previous month</p>
                </div>
            </div>
            <div className="totalBalance-footer">
                <button className="add-income" id="add_income" onClick={onHandleClick}>
                {/* <i class="fas fa-arrow-left"></i> */}
                ADD INCOME</button>
                <button className="add-expense" id="add_expense" onClick={onHandleClick}>ADD EXPENSE</button>
            </div>
            <TotalExpensesSettings visibile={isModal} showTotalExpensesSettings={showTotalExpensesSettings} />
        </div>
    )
}

export { TotalBalance };
