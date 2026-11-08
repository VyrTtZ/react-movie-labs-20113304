import { createTheme } from '@mui/material/styles';
import { transform } from 'lodash';

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
        body: { padding: "0 24px", mt: "200px"},
    "@keyframes glitch": {
  "0%, 100%": { transform: "translate(0, 0)" },
  "20%":      { transform: "translate(-4px, 0)", clipPath: "inset(10% 0 60% 0)" },
  "22%":      { transform: "translate(0, 0)",    clipPath: "inset(0)" },
  "60%":      { transform: "translate(4px, 0)",  clipPath: "inset(50% 0 20% 0)" },
  "62%":      { transform: "translate(0, 0)",    clipPath: "inset(0)" },
},
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          animation: "glitch 2s steps(1) infinite",
        },
      },
    },

    MuiCardMedia: {
  styleOverrides: {
    root: { animation: "glitch 2s steps(1) infinite" },
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
