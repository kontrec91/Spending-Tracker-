import React from 'react';
import "../css/totalExpensesSettings.css";

const TotalExpensesSettings = (props) => {
    if(!props.visibile) return null
    return(
        <div className="total-expenses-settings" onClick={props.showTotalExpensesSettings}>
            <div className="dialog-settings">hello, world!</div>
        </div>
    )
}

export { TotalExpensesSettings }