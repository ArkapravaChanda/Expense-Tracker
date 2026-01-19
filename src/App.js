import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    const newTransaction = { id: Date.now(), text, amount: +amount };
    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions.filter((t) => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter((t) => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <div className="balance">
        <h3>Balance: ${income + expense}</h3>
        <div className="inc-exp">
          <div>
            <h4>Income</h4>
            <p className="money plus">${income}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p className="money minus">${Math.abs(expense)}</p>
          </div>
        </div>
      </div>

      <form onSubmit={addTransaction}>
        <input type="text" placeholder="Enter description..." value={text} onChange={(e) => setText(e.target.value)} />
        <input type="number" placeholder="Enter amount..." value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Add Transaction</button>
      </form>

      <h3>History</h3>
      <ul className="history">
        {transactions.map((t) => (
          <li key={t.id} className={t.amount > 0 ? "plus" : "minus"}>
            {t.text} <span>${t.amount}</span>
            <button onClick={() => deleteTransaction(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
