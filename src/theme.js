import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#943B3B',
    },
    secondary: {
      main: '#A96262',
    },
    action: {
      disabledBackground: '#E38989',
      disabled: '#FFFFF',
    },
  },
});
export default theme;
