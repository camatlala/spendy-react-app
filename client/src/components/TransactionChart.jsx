import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';

export default function TransactionDonutChart({ transactions = [] }) {
  const [itemData, setItemData] = React.useState(null);

  const incomeCategories = [];
  const expenseCategories = [];

  transactions.forEach((t) => {
    const category = t.category_name || t.category || 'Other';
    const amount = parseFloat(t.amount || 0);

    const targetArray = t.type === 'income' ? incomeCategories : expenseCategories;
    const existing = targetArray.find(c => c.label === category);
    if (existing) {
      existing.value += amount;
    } else {
      targetArray.push({ label: category, value: amount });
    }
  });

  const series = [
    {
      innerRadius: 0,
      outerRadius: 80,
      id: 'income-series',
      data: incomeCategories,
    },
    {
      innerRadius: 100,
      outerRadius: 120,
      id: 'expense-series',
      data: expenseCategories,
    },
  ];

  return (
    <Stack direction="column" spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
      <PieChart
        series={series}
        width={400}
        height={400}
        onItemClick={(event, d) => setItemData(d)}
      />
      {itemData && (
        <Box>
          <Typography variant="body1">
            <strong>{itemData.seriesId === 'income-series' ? 'Income' : 'Expense'}:</strong>{' '}
            {itemData.label} - R{itemData.value.toLocaleString()}
          </Typography>
          <IconButton onClick={() => setItemData(null)}>
            <UndoOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
}
