import React from 'react';
    import { Typography, Paper, Box } from '@mui/material';

    function Summary({ options }) {
      const calculateSummary = () => {
        return options.reduce((acc, option) => {
          if (option.status === 'Closed') {
            const year = new Date(option.closeDate).getFullYear();
            const account = option.account || 'Unspecified';
            const profitLoss = option.buySell === 'Sell'
              ? (parseFloat(option.premium) - parseFloat(option.exitPrice)) * option.amtOfContracts * 100 - parseFloat(option.fees || 0)
              : (parseFloat(option.exitPrice) - parseFloat(option.premium)) * option.amtOfContracts * 100 - parseFloat(option.fees || 0);

            if (!acc[year]) acc[year] = {};
            if (!acc[year][account]) acc[year][account] = 0;
            acc[year][account] += profitLoss;
          }
          return acc;
        }, {});
      };

      const summary = calculateSummary();

      return (
        <Paper sx={{ mt: 4, p: 2 }}>
          <Typography variant="h5" gutterBottom>Summary</Typography>
          {Object.entries(summary).map(([year, accounts]) => (
            <Box key={year} sx={{ mb: 2 }}>
              <Typography variant="h6">{year}</Typography>
              {Object.entries(accounts).map(([account, profitLoss]) => (
                <Box key={account} sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
                  <Typography>{account}:</Typography>
                  <Typography color={profitLoss >= 0 ? 'success.main' : 'error.main'}>
                    ${profitLoss.toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Paper>
      );
    }

    export default Summary;
