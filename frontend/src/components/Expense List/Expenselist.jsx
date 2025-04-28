import React, { useState, useEffect } from "react";
import styles from "./ExpenseList.module.scss"; // Import the SCSS

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    fetch("https://expense-tracker-5-xrhr.onrender.com/expenses")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://expense-tracker-5-xrhr.onrender.com/expenses/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Delete failed");
        }
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  const handleEditClick = (expense) => {
    setEditingId(expense._id);
    setEditFormData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date ? expense.date.slice(0, 10) : "", // just first part of date
    });
  };

  const handleSaveClick = (id) => {
    fetch(`https://expense-tracker-5-xrhr.onrender.com/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Update failed");
        }
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === id ? { ...expense, ...editFormData } : expense
          )
        );
        setEditingId(null);
        console.log("successfully edited");
      })
      .catch((error) => console.log(error));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Expense List</h2>
      <ul className={styles.expenseList}>
        {expenses.map((expense) => (
          <li key={expense._id} className={styles.expenseCard}>
            {editingId === expense._id ? (
              <>
                <input
                  type="number"
                  name="amount"
                  value={editFormData.amount}
                  onChange={handleEditChange}
                  className={styles.inputField}
                  placeholder="Amount"
                />
                <input
                  type="text"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  className={styles.inputField}
                  placeholder="Category"
                />
                <input
                  type="text"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  className={styles.inputField}
                  placeholder="Description"
                />
                <input
                  type="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditChange}
                  className={styles.inputField}
                  placeholder="Date"
                />
              </>
            ) : (
              <>
                <div className={styles.expenseInfo}>
                  <span>Amount:</span> ₹{expense.amount}
                </div>
                <div className={styles.expenseInfo}>
                  <span>Category:</span> {expense.category}
                </div>
                <div className={styles.expenseInfo}>
                  <span>Description:</span> {expense.description}
                </div>
                <div className={styles.expenseInfo}>
                  <span>Date:</span>{" "}
                  {expense.date ? expense.date.slice(0, 10) : ""}
                </div>
              </>
            )}

            <div className={styles.buttonGroup}>
              {editingId === expense._id ? (
                <button
                  className={styles.saveButton}
                  onClick={() => handleSaveClick(expense._id)}
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
