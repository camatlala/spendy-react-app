import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title
);

function TransactionChart({ transactions }) {
  // --- 🧮 Categorize transactions ---
  const incomeCategories = {};
  const expenseCategories = {};
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    const category = t.category_name || t.category || 'Other';
    const amount = parseFloat(t.amount || 0);

    if (t.type === 'income') {
      totalIncome += amount;
      incomeCategories[category] = (incomeCategories[category] || 0) + amount;
    } else {
      totalExpense += amount;
      expenseCategories[category] = (expenseCategories[category] || 0) + amount;
    }
  });

  // --- 🥧 Pie Chart (Nested Doughnut) ---
  const pieData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        // INNER RING
        label: 'Totals',
        data: [totalIncome, totalExpense],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 1,
        weight: 1,
      },
      {
        // OUTER RING
        label: 'Category Breakdown',
        data: [...Object.values(incomeCategories), ...Object.values(expenseCategories)],
        backgroundColor: [
          ...Object.keys(incomeCategories).map(() => '#34d399'),
          ...Object.keys(expenseCategories).map(() => '#f87171'),
        ],
        borderWidth: 1,
        weight: 0.8,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          usePointStyle: true,
          boxWidth: 10,
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: R${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  // --- 📈 Line Chart Data ---
  const dates = [...new Set(transactions.map(t => new Date(t.date).toISOString().split('T')[0]))].sort();

  const incomeData = dates.map(date =>
    transactions
      .filter(t => t.type === 'income' && new Date(t.date).toISOString().split('T')[0] === date)
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0)
  );

  const expenseData = dates.map(date =>
    transactions
      .filter(t => t.type === 'expense' && new Date(t.date).toISOString().split('T')[0] === date)
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0)
  );

  const balanceData = [];
    for (let i = 0; i < dates.length; i++) {
      const income = incomeData[i] || 0;
      const expense = expenseData[i] || 0;
      const prev = i === 0 ? 0 : balanceData[i - 1];
  balanceData[i] = prev + income - expense;
}

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        fill: false,
        borderColor: '#10b981',
        tension: 0.3,
        pointBackgroundColor: '#10b981',
      },
      {
        label: 'Expense',
        data: expenseData,
        fill: false,
        borderColor: '#ef4444',
        tension: 0.3,
        pointBackgroundColor: '#ef4444',
      },
      {
        label: 'Balance',
        data: balanceData,
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.3,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: '#374151',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  };

  // --- JSX Output ---
  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
      <div className="w-full max-w-[500px] h-[400px]">
        <Pie data={pieData} options={pieOptions} />
      </div>
      <div className="w-full max-w-[800px] h-[400px]">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}

export default TransactionChart;
