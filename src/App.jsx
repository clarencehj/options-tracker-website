import React, { useState, useEffect } from 'react';
    import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
    import OptionForm from './components/OptionForm';
    import OptionList from './components/OptionList';
    import Summary from './components/Summary';
    import ThemeSwitcher from './components/ThemeSwitcher';
    import { Container, Box } from '@mui/material';

    function App() {
      const [options, setOptions] = useState(() => {
        const savedOptions = localStorage.getItem('options');
        return savedOptions ? JSON.parse(savedOptions) : [];
      });
      const [darkMode, setDarkMode] = useState(false);

      const theme = createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      });

      useEffect(() => {
        localStorage.setItem('options', JSON.stringify(options));
      }, [options]);

      const addOption = (option) => {
        setOptions([...options, { ...option, id: Date.now() }]);
      };

      const updateOption = (updatedOption) => {
        setOptions(options.map(option => 
          option.id === updatedOption.id ? updatedOption : option
        ));
      };

      const deleteOption = (id) => {
        setOptions(options.filter(option => option.id !== id));
      };

      const toggleTheme = () => {
        setDarkMode(!darkMode);
      };

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
              <ThemeSwitcher toggleTheme={toggleTheme} darkMode={darkMode} />
              <OptionForm addOption={addOption} options={options} />
              <OptionList 
                options={options} 
                updateOption={updateOption} 
                deleteOption={deleteOption} 
              />
              <Summary options={options} />
            </Box>
          </Container>
        </ThemeProvider>
      );
    }

    export default App;
