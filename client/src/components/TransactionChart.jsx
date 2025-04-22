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
  // 🥧 Pie chart: Prepare data
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

  const outerLabels = [...Object.keys(incomeCategories), ...Object.keys(expenseCategories)];
  const outerData = [...Object.values(incomeCategories), ...Object.values(expenseCategories)];
  const outerColors = [
    ...Object.keys(incomeCategories).map(() => '#10b981'), // income = green
    ...Object.keys(expenseCategories).map(() => '#ef4444') // expense = red
  ];

  const innerLabels = ['Income', 'Expense'];
  const innerData = [totalIncome, totalExpense];
  const innerColors = ['#10b981', '#ef4444'];

  const pieData = {
    labels: outerLabels,
    datasets: [
      {
        label: 'Category Breakdown',
        data: outerData,
        backgroundColor: outerColors,
        borderWidth: 1,
        hoverOffset: 10
      },
      {
        label: 'Income vs Expense',
        data: innerData,
        backgroundColor: innerColors,
        borderWidth: 1,
        hoverOffset: 10
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            size: 14,
          },
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        titleColor: 'white',
        bodyColor: 'white',
        backgroundColor: '#1f2937',
        callbacks: {
          label: (ctx) => `${ctx.label}: R${ctx.raw.toLocaleString()}`
        }
      },
    },
  };

  // 📈 Line chart: Prepare cumulative income, expense & balance
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

  let cumulativeBalance = 0;
  const balanceData = incomeData.map((inc, idx) => {
    cumulativeBalance += inc - expenseData[idx];
    return cumulativeBalance;
  });

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
        borderColor: '#3b82f6', // blue
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

  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
      {/* Pie Chart Section */}
      <div className="w-full max-w-[500px] h-[400px]">
        <Pie data={pieData} options={pieOptions} />
      </div>

      {/* Line Chart Section */}
      <div className="w-full max-w-[800px] h-[400px]">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}

export default TransactionChart;
