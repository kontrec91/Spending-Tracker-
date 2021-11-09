import React, { useState } from 'react';
import { DeleteItem } from './DeleteItem';


const List = (props) => {
    console.log(props)
    let keyArray =  props.array && props.array.length? Object.keys(props.array[0]) : null;

    function onDeleteHandler(indexElem, income) {
        // if (income && props.array.length > 1) {
        if (income && props.array.length ) {
            props.array.splice(indexElem, 1);
            localStorage.setItem('listArrayIncomes', JSON.stringify(props.array));
            props.getIncomeSum();
        // } else if (props.array.length > 1) {
        } else if (props.array.length) {
            props.array.splice(indexElem, 1);
            localStorage.setItem('listArrayExpenses', JSON.stringify(props.array));
            props.getExpensesSum();
        }
    }

    // props.array.filter(())
    props.array.map((item, index) => {console.log(item.date)})

    return (
        <table className="expenses-table">
            <thead>
                <tr>
                    {keyArray && keyArray.map((item, index) => {
                        return <td key={index}>{item}</td>
                    })}
                </tr>
            </thead>
            <tbody>
                {props.array && props.array.map((item, index) => {
                    if (props.income) {
                        return (
                            <tr key={index} id={index} onClick={(e) => e.target.className === 'deleteItem' ? onDeleteHandler(index, props.income) : ''}>
                                <td>{item.name}</td><td>{item.amount}</td><td>{item.date}</td><DeleteItem />
                            </tr>)
                    } else {
                        return <tr key={index} id={index} onClick={(e) => e.target.className === 'deleteItem' ? onDeleteHandler(index) : ''}>
                            <td>{item.date}</td><td>{item.amount}</td><td>{item.category}</td><DeleteItem />
                        </tr>
                    }
                })}
            </tbody> 
        </table>
    )
}

export { List }