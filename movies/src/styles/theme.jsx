import { createTheme } from '@mui/material/styles';


// App-wide MUI theme: dark mode with neon colours and a glitch animation
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4848b5" }, // blue
    secondary: { main: "#affe02" }, // neon green
    background: { default: "#000000", paper: "#000000" }, // pure black page and surfaces
  },
  typography: {
    fontFamily: 'Consolas, monospace',
    h1: { fontSize: '15px', fontWeight: 700 },
  },
  // Default style overrides for specific MUI components
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { padding: "0 24px", mt: "200px"},
          // Glitch effect: brief horizontal jumps with parts of the element clipped out
          "@keyframes glitch": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "20%":      { transform: "translate(-4px, 0)", clipPath: "inset(10% 0 60% 0)" },
            "22%":      { transform: "translate(0, 0)",    clipPath: "inset(0)" },
            "60%":      { transform: "translate(4px, 0)",  clipPath: "inset(50% 0 20% 0)" },
            "62%":      { transform: "translate(0, 0)",    clipPath: "inset(0)" },
          },
      },
    },
    // All text is bold and glitches every 2s (steps(1) makes it jump, not slide)
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          animation: "glitch 2s steps(1) infinite",
        },
      },
    },
    // Images glitch too
    MuiCardMedia: {
      styleOverrides: {
        root: { animation: "glitch 2s steps(1) infinite" },
      },
    },
    // Cards, menus, etc.: blue border with a green neon glow
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // removes MUI's default dark-mode overlay
          border: "2px solid #4848b5",
          boxShadow: "0 0 2px #affe02, 0 0 6px #affe02, 0 0 10px #affe02",
          padding: "12px",
        },
      },
    },
  // Spacing around all icons
  MuiSvgIcon: {
    styleOverrides: {
      root: { margin: "8px" },
    },
  },
  },
});