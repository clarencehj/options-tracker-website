import React, { useState, useEffect } from 'react';
    import { TextField, Button, Grid, MenuItem, Box, Autocomplete } from '@mui/material';

    function OptionForm({ addOption, options }) {
      const [formData, setFormData] = useState({
        stockSymbol: '',
        openDate: '',
        expDate: '',
        callOrPut: 'Call',
        buySell: 'Buy',
        stockPrice: '',
        strikePrice: '',
        premium: '',
        amtOfContracts: '',
        fees: '',
        exitPrice: '',
        closeDate: '',
        status: 'Open',
        account: ''
      });

      const [accounts, setAccounts] = useState([]);

      useEffect(() => {
        const uniqueAccounts = [...new Set(options.map(option => option.account))];
        setAccounts(uniqueAccounts);
      }, [options]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleAccountChange = (event, newValue) => {
        setFormData({ ...formData, account: newValue });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        addOption(formData);
        setFormData({
          stockSymbol: '',
          openDate: '',
          expDate: '',
          callOrPut: 'Call',
          buySell: 'Buy',
          stockPrice: '',
          strikePrice: '',
          premium: '',
          amtOfContracts: '',
          fees: '',
          exitPrice: '',
          closeDate: '',
          status: 'Open',
          account: ''
        });
      };

      return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="stockSymbol"
                label="Stock Symbol"
                value={formData.stockSymbol}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="openDate"
                label="Open Date"
                type="date"
                value={formData.openDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="expDate"
                label="Expiration Date"
                type="date"
                value={formData.expDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="callOrPut"
                label="Call or Put"
                value={formData.callOrPut}
                onChange={handleChange}
                required
              >
                <MenuItem value="Call">Call</MenuItem>
                <MenuItem value="Put">Put</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="buySell"
                label="Buy or Sell"
                value={formData.buySell}
                onChange={handleChange}
                required
              >
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="stockPrice"
                label="Stock Price (Optional)"
                type="number"
                value={formData.stockPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="strikePrice"
                label="Strike Price"
                type="number"
                value={formData.strikePrice}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="premium"
                label="Premium"
                type="number"
                value={formData.premium}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="amtOfContracts"
                label="Amount of Contracts"
                type="number"
                value={formData.amtOfContracts}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="fees"
                label="Fees"
                type="number"
                value={formData.fees}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="exitPrice"
                label="Exit Price"
                type="number"
                value={formData.exitPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="closeDate"
                label="Close Date"
                type="date"
                value={formData.closeDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="status"
                label="Status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={accounts}
                value={formData.account}
                onChange={handleAccountChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="account"
                    label="Account"
                    onChange={(e) => handleAccountChange(e, e.target.value)}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Option
          </Button>
        </Box>
      );
    }

    export default OptionForm;
