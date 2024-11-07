import React from 'react';
    import { IconButton } from '@mui/material';
    import Brightness4Icon from '@mui/icons-material/Brightness4';
    import Brightness7Icon from '@mui/icons-material/Brightness7';

    function ThemeSwitcher({ toggleTheme, darkMode }) {
      return (
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      );
    }

    export default ThemeSwitcher;
