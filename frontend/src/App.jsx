import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ExpenseDataForm from "./components/Expense dataform/ExpenseDataForm";
import ExpenseList from "./components/Expense List/Expenselist";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<ExpenseDataForm />} />
          <Route path="/add" element={<ExpenseList />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
