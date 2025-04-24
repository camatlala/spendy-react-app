import React from 'react';
import { Doughnut, Chart as ChartComponent } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  TimeScale,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  PointElement
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // for time scale

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  TimeScale,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  PointElement
);

function TransactionChart({ transactions }) {
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

  const incomeColor = '#10b981';
  const expenseColor = '#ef4444';

  const pieData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: [incomeColor, expenseColor],
        borderWidth: 1,
      },
      {
        data: [
          ...Object.values(incomeCategories),
          ...Object.values(expenseCategories)
        ],
        backgroundColor: [
          ...Object.keys(incomeCategories).map((_, i) => `hsl(150, 100%, ${60 - i * 3}%)`),
          ...Object.keys(expenseCategories).map((_, i) => `hsl(0, 100%, ${60 - i * 3}%)`)
        ],
        borderWidth: 1,
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: { size: 14 }
        }
      },
      tooltip: {
        callbacks: {
          label: context => {
            return `${context.label}: R${(context.raw || 0).toLocaleString()}`;
          }
        }
      }
    }
  };

  // --- Time Combo Chart Prep ---
  const grouped = {};

  transactions.forEach((t) => {
    const date = new Date(t.date).toISOString().split('T')[0];
    if (!grouped[date]) grouped[date] = { income: 0, expense: 0 };
    if (t.type === 'income') grouped[date].income += parseFloat(t.amount || 0);
    else grouped[date].expense += parseFloat(t.amount || 0);
  });

  const sortedDates = Object.keys(grouped).sort();
  let runningBalance = 0;
  const incomeData = [], expenseData = [], balanceData = [], timeLabels = [];

  sortedDates.forEach(date => {
    const income = grouped[date].income || 0;
    const expense = grouped[date].expense || 0;
    runningBalance += income - expense;

    incomeData.push({ x: date, y: income });
    expenseData.push({ x: date, y: expense });
    balanceData.push({ x: date, y: runningBalance });
    timeLabels.push(date);
  });

  const comboData = {
    labels: timeLabels,
    datasets: [
      {
        type: 'bar',
        label: 'Income',
        backgroundColor: incomeColor,
        borderColor: incomeColor,
        data: incomeData
      },
      {
        type: 'bar',
        label: 'Expense',
        backgroundColor: expenseColor,
        borderColor: expenseColor,
        data: expenseData
      },
      {
        type: 'line',
        label: 'Balance',
        borderColor: '#3b82f6',
        fill: false,
        data: balanceData
      }
    ]
  };

  const comboOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Income vs Expense vs Balance Over Time',
        color: 'white'
      },
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        ticks: {
          color: 'white'
        },
        grid: {
          color: '#374151'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: '#374151'
        }
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
      {/* Pie Chart */}
      <div className="w-full max-w-[500px] h-[400px]">
        <Doughnut data={pieData} options={pieOptions} />
      </div>

      {/* Combo Time Chart */}
      <div className="w-full max-w-[800px] h-[400px]">
        <ChartComponent type="bar" data={comboData} options={comboOptions} />
      </div>
    </div>
  );
}

export default TransactionChart;
