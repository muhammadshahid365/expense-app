import React, { useReducer, useState } from 'react'
import './App.css';
import transReducer from './TransReducer'

function App() {
  const [newAmount, setAmount] = useState(0)
  const [newDesc, setDesc] = useState("")
  const { reducer, initialState } = transReducer
  const [state, dispach] = useReducer(reducer, initialState)
  // const [expense, setExpense] = useState(0)
  // const [Income, setIncome] = useState(0)

  const transLis = state.map((transaction, ind) => {
    return (
      <div>
        <li key={ind} className={transaction.amount < 0 ? "minus": "plus"}>
          <span>{transaction.desc}</span>
          <span>{transaction.amount} <button
            className="del-button"
            onClick={handleDeletion}
            id={ind}>X</button>
          </span>
        </li>
      </div>
    )
  })

  function getIncome() {
    let income = 0
    for (let i = 0; i < state.length; i++) {
      if (state[i].amount > 0)
        income += state[i].amount
    }
    return income
  }

  function getExpense() {
    let expense = 0
    for (let i = 0; i < state.length; i++) {
      if (state[i].amount < 0)
        expense += state[i].amount
    }
    return expense
  }

  function handleAddition(event) {
    event.preventDefault()
    dispach({
      type: "ADD",
      payload: {
        desc: newDesc,
        amount: Number(newAmount)
      }
    })
    document.querySelector("#desc").value = ""
    document.querySelector("#amount").value = ""
  }

  function handleDeletion(event) {
    console.log(event.target.id)
    dispach({
      type: "DELETE",
      payload: {
        index: Number(event.target.id)
      }
    })
  }

  return (
    <div className="container">
      <h1 className="center">Expense Tracker</h1>

      <h2><u>YOUR BALANCE </u><br />${getIncome() + getExpense()}</h2>
      <div className="display">
        <h3>INCOME <br /> ${getIncome()}</h3>
        <h3>EXPENSE <br /> ${getExpense()}</h3>
      </div>
      <h2>History</h2>
      {
        transLis
      }
      <br />
      <h2>Add new transaction</h2>
      <hr />
      <form className="trans-form" onSubmit={handleAddition}>
        <label>
          <h3>Description</h3>
          <input
            type="text"
            autoCapitalize="true"
            required id="desc"
            placeholder="Enter text..."
            onChange={(ev) => setDesc(ev.target.value)}
          />
        </label>
        <label>
          <h3>Amount</h3>
          <input
            type="number"
            autoComplete="off" id="amount"
            placeholder="Enter amount..."
            onChange={(ev) => setAmount(ev.target.value)}
          />
        </label>
        <button id="submit-button">Add Transaction</button>
      </form>
    </div>
  );
}

export default App;
