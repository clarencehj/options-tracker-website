import React, { useState } from 'react';
    import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, MenuItem } from '@mui/material';
    import EditIcon from '@mui/icons-material/Edit';
    import DeleteIcon from '@mui/icons-material/Delete';
    import SaveIcon from '@mui/icons-material/Save';
    import CancelIcon from '@mui/icons-material/Cancel';
    import { differenceInDays, parseISO } from 'date-fns';

    function OptionList({ options, updateOption, deleteOption }) {
      const [editingId, setEditingId] = useState(null);
      const [editedOption, setEditedOption] = useState({});

      const handleEdit = (option) => {
        setEditingId(option.id);
        setEditedOption(option);
      };

      const handleSave = () => {
        updateOption(editedOption);
        setEditingId(null);
      };

      const handleCancel = () => {
        setEditingId(null);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedOption({ ...editedOption, [name]: value });
      };

      const calculateDerivedFields = (option) => {
        if (option.status === 'Closed') {
          let profitLoss;
          if (option.buySell === 'Sell') {
            profitLoss = (parseFloat(option.premium) - parseFloat(option.exitPrice)) * option.amtOfContracts * 100 - parseFloat(option.fees || 0);
          } else {
            profitLoss = (parseFloat(option.exitPrice) - parseFloat(option.premium)) * option.amtOfContracts * 100 - parseFloat(option.fees || 0);
          }
          const daysHeld = differenceInDays(parseISO(option.closeDate), parseISO(option.openDate));
          const initialInvestment = parseFloat(option.premium) * option.amtOfContracts * 100;
          const annualizedROR = ((profitLoss / initialInvestment) / daysHeld) * 365 * 100;
          const marginRequirement = parseFloat(option.strikePrice) * option.amtOfContracts * 100 * 0.2;
          const marginAnnualizedROR = ((profitLoss / marginRequirement) / daysHeld) * 365 * 100;

          return {
            profitLoss: profitLoss.toFixed(2),
            daysHeld,
            annualizedROR: annualizedROR.toFixed(2),
            marginAnnualizedROR: marginAnnualizedROR.toFixed(2)
          };
        }
        return { profitLoss: 'N/A', daysHeld: 'N/A', annualizedROR: 'N/A', marginAnnualizedROR: 'N/A' };
      };

      const getTextFieldStyle = {
        '& .MuiInputBase-input': {
          fontSize: '0.7rem',
          padding: '0.3rem',
        },
        width: '80px',
      };

      return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Stock Symbol</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Open Date</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Exp Date</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Call/Put</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Buy/Sell</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Stock Price</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Strike Price</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Premium</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Amount of Contracts</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Fees</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Exit Price</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Close Date</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Status</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Account</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Profit/Loss*</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Days Held*</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Annualized ROR*</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Margin Annualized ROR*</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '6px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {options.map((option) => {
                const isEditing = option.id === editingId;
                const derivedFields = calculateDerivedFields(option);
                return (
                  <TableRow key={option.id}>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField name="stockSymbol" value={editedOption.stockSymbol} onChange={handleChange} sx={getTextFieldStyle} /> : option.stockSymbol}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="date" name="openDate" value={editedOption.openDate} onChange={handleChange} sx={getTextFieldStyle} /> : option.openDate}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="date" name="expDate" value={editedOption.expDate} onChange={handleChange} sx={getTextFieldStyle} /> : option.expDate}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? 
                      <TextField select name="callOrPut" value={editedOption.callOrPut} onChange={handleChange} sx={getTextFieldStyle}>
                        <MenuItem value="Call">Call</MenuItem>
                        <MenuItem value="Put">Put</MenuItem>
                      </TextField> : option.callOrPut}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? 
                      <TextField select name="buySell" value={editedOption.buySell} onChange={handleChange} sx={getTextFieldStyle}>
                        <MenuItem value="Buy">Buy</MenuItem>
                        <MenuItem value="Sell">Sell</MenuItem>
                      </TextField> : option.buySell}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="number" name="stockPrice" value={editedOption.stockPrice} onChange={handleChange} sx={getTextFieldStyle} /> : option.stockPrice}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="number" name="strikePrice" value={editedOption.strikePrice} onChange={handleChange} sx={getTextFieldStyle} /> : option.strikePrice}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="number" name="premium" value={editedOption.premium} onChange={handleChange} sx={getTextFieldStyle} /> : option.premium}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="number" name="amtOfContracts" value={editedOption.amtOfContracts} onChange={handleChange} sx={getTextFieldStyle} /> : option.amtOfContracts}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="number" name="fees" value={editedOption.fees} onChange={handleChange} sx={getTextFieldStyle} /> : option.fees}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="number" name="exitPrice" value={editedOption.exitPrice} onChange={handleChange} sx={getTextFieldStyle} /> : option.exitPrice}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField type="date" name="closeDate" value={editedOption.closeDate} onChange={handleChange} sx={getTextFieldStyle} /> : option.closeDate}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? 
                      <TextField select name="status" value={editedOption.status} onChange={handleChange} sx={getTextFieldStyle}>
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                      </TextField> : option.status}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{isEditing ? <TextField name="account" value={editedOption.account} onChange={handleChange} sx={getTextFieldStyle} /> : option.account}</TableCell>
                    <TableCell 
                      sx={{ 
                        fontSize: '0.7rem',
                        padding: '6px',
                        backgroundColor: derivedFields.profitLoss > 0 ? 'green' : (derivedFields.profitLoss < 0 ? 'maroon' : 'inherit'),
                        color: derivedFields.profitLoss !== 'N/A' ? 'white' : 'inherit'
                      }}
                    >
                      {derivedFields.profitLoss !== 'N/A' ? `$${derivedFields.profitLoss}` : 'N/A'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{derivedFields.daysHeld}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{derivedFields.annualizedROR !== 'N/A' ? `${derivedFields.annualizedROR}%` : 'N/A'}</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', padding: '6px' }}>{derivedFields.marginAnnualizedROR !== 'N/A' ? `${derivedFields.marginAnnualizedROR}%` : 'N/A'}</TableCell>
                    <TableCell sx={{ padding: '6px' }}>
                      {isEditing ? (
                        <>
                          <IconButton onClick={handleSave} size="small"><SaveIcon fontSize="small" /></IconButton>
                          <IconButton onClick={handleCancel} size="small"><CancelIcon fontSize="small" /></IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEdit(option)} size="small"><EditIcon fontSize="small" /></IconButton>
                          <IconButton onClick={() => deleteOption(option.id)} size="small"><DeleteIcon fontSize="small" /></IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    export default OptionList;
