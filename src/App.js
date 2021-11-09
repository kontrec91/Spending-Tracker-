import React, { useState, useContext } from 'react'

import {
  Router,
  Switch,
  Route,
} from "react-router-dom";

import history from './utils/history'


import './css/App.css';
import { TotalBalance } from "./conponents/TotalBalance";
import { AddExpense } from "./conponents/AddExpense";
import { Expenses } from "./conponents/Expenses";
import { AddIncome } from "./conponents/AddIncome";
import { IncomesByDate } from './conponents/IncomesByDate';
import ExpensesChart from './conponents/ExpensesChart';


function App() {

  ///////////////////

  const name = {
    name: "Vasya"
  }

  // const themes = {
  //   light: {
  //     foreground: "#000000",
  //     background: "#eeeeee"
  //   },
  //   dark: {
  //     foreground: "#ffffff",
  //     background: "#222222"
  //   }
  // };

  // const ThemeContext = React.createContext(themes.light);
  const ThemeContext = React.createContext(name);

  function MainHeader(){
    return (
      <div>
        <Header/>
      </div>
    )
  }

  function Header() {
    const theme = useContext(ThemeContext)
    return(
      <h1>{theme.name}</h1>
    )
  }
  // function App() {
  //   return (
  //     <ThemeContext.Provider value={themes.dark}>
  //       <Toolbar />
  //     </ThemeContext.Provider>
  //   );
  // }

  // function Toolbar(props) {
  //   return (
  //     <div>
  //       <ThemedButton />
  //     </div>
  //   );
  // }

  // function ThemedButton() {
  //   const theme = useContext(ThemeContext);
  //   // const [theme, setTheme]= useContext(ThemeContext);

  //   return (
  //     <button 
  //     // onclick = {()=> 
  //       style={{ background: theme.background, color: theme.foreground }}>
  //       Я стилизован темой из контекста!
  //     </button>
  //   );
  // }
  /////////////////////////////////

  //   const [name, setName] = useLocalStorage("name", "Bob");

  //   //setName === useLocalStorage(=== setStoredValue === setValue)
  //   //name === storedValue
  // //setValue -- заносить встейт из LS, а setStoredValue сохраняет стейт из LS
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={(props) => <TotalBalance />} />
          <Route path="/add_expense" render={(props) => <AddExpense />} />
          <Route path="/expenses" render={props => <Expenses />} />
          <Route path="/add_income" render={(props) => <AddIncome />} />
          <Route path="/incomes_by_date" render={(props) => <IncomesByDate />} />
          <Route path="/pie_diagram" render={(props) => <ExpensesChart />} />
        </Switch>
      </Router>

      {/* <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div> */}
      {/* <ThemeContext.Provider value={themes.dark}>
            <Toolbar />
          </ThemeContext.Provider> */}

      <div>
        {/* <Header/> */}
        <MainHeader/>
        asdasd
      </div>


    </div>
  );
}

// // Hook
// function useLocalStorage(key, initialValue) {
//   // State to store our value
//   // Pass initial state function to useState so logic is only executed once
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       // Get from local storage by key
//       const item = window.localStorage.getItem(key);
//       // Parse stored json or if none return initialValue
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       // If error also return initialValue
//       console.log(error);
//       return initialValue;
//     }
//   });
//   // Return a wrapped version of useState's setter function that ...
//   // ... persists the new value to localStorage.
//   const setValue = (value) => {
//     try {
//       // Allow value to be a function so we have same API as useState
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       // Save state
//       setStoredValue(valueToStore);
//       // Save to local storage
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       // A more advanced implementation would handle the error case
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue];
// }

export default App;
