import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import styles from "./Dashboard.module.scss"; // 👉 import SCSS file
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("https://expense-tracker-5-xrhr.onrender.com/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).getMonth();
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(monthlyData).map(
      (month) => `Month ${parseInt(month) + 1}`
    ),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyData),
        backgroundColor: "#66b3ff",
      },
    ],
  };

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.heading}>Dashboard</h2>
      <div className={styles.chartSection}>
        <div className={styles.chartCard}>
          <h3 className={styles.subHeading}>Expense Category Distribution</h3>
          <Pie data={pieData} width={300} height={300} />
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.subHeading}>Monthly Expenses</h3>
          <Bar data={barData} width={300} height={300} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
