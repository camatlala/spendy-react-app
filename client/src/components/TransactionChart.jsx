import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TransactionChart({ transactions = [] }) {
  // Step 1: Process data
  const incomeCategories = {};
  const expenseCategories = {};
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(t => {
    const category = t.category_name || t.category || 'Other';
    const amount = parseFloat(t.amount || 0);

    if (t.type === 'income') {
      totalIncome += amount;
      incomeCategories[category] = (incomeCategories[category] || 0) + amount;
    } else if (t.type === 'expense') {
      totalExpense += amount;
      expenseCategories[category] = (expenseCategories[category] || 0) + amount;
    }
  });

  // Step 2: Prepare pie chart data
  const pieData = {
    labels: [
      ...Object.keys(incomeCategories),
      ...Object.keys(expenseCategories),
      'Income',
      'Expense'
    ],
    datasets: [
      {
        // INNER ring
        label: 'Total Income vs Expense',
        data: [totalIncome, totalExpense],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 1,
      },
      {
        // OUTER ring
        label: 'Category Breakdown',
        data: [
          ...Object.values(incomeCategories),
          ...Object.values(expenseCategories)
        ],
        backgroundColor: [
          ...Object.keys(incomeCategories).map(() => '#34d399'), // income green shades
          ...Object.keys(expenseCategories).map(() => '#f87171'), // expense red shades
        ],
        borderWidth: 1,
      },
    ],
  };

  // Step 3: Customize the chart options
  const pieOptions = {
    responsive: true,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          filter: (legendItem) => legendItem.datasetIndex === 1, // Only show category legend
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

  return (
    <div className="w-full max-w-[500px] h-[400px] mx-auto">
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
}
