import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4848b5" },
    secondary: { main: "#affe02" },
    background: { default: "#000000", paper: "#000000" },
  },
  typography: {
    fontFamily: 'Consolas, monospace',
    h1: { fontSize: '15px', fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { padding: "0 24px" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "2px solid #4848b5",
	boxShadow: "0 0 2px #affe02, 0 0 6px #affe02, 0 0 10px #affe02",
	padding: "12px",
	},
      },
    },
  MuiSvgIcon: {
  styleOverrides: {
    root: { margin: "8px" },
  },
},},
});
