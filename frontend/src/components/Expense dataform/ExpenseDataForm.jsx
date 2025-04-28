import React, { useState } from "react";
import styles from "./ExpenseForm.module.scss";
import { useNavigate } from "react-router-dom";

const ExpenseDataForm = () => {
  const [formData, setFormdata] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch(`https://expense-tracker-5-xrhr.onrender.com/expenses/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setFormdata({ amount: "", category: "", description: "", date: "" });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className={styles.topButtons}>
        <button
          className={styles.NavButton}
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
        <button className={styles.NavButton} onClick={() => navigate("/add")}>
          View All Expenses
        </button>
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={handleClick} className={styles.formContainer}>
          <h1 className={styles.heading}>Add Your Expense</h1>
          <span className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              name="amount"
              type="number"
              onChange={handleChange}
              value={formData.amount}
              placeholder="Amount"
              required
            />
          </span>
          <span>
            <input
              className={styles.inputField}
              name="category"
              type="text"
              onChange={handleChange}
              value={formData.category}
              placeholder="Category"
              required
            />
          </span>
          <span>
            <textarea
              className={styles.textareaField}
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Description"
              required
            ></textarea>
          </span>
          <span>
            <input
              className={styles.inputField}
              name="date"
              type="date"
              onChange={handleChange}
              value={formData.date}
              placeholder="Date"
              required
            />
          </span>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpenseDataForm;
