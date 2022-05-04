import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "sans-serif",
  },
  palette: {
    mode: "light",
    primary: {
      // Twitter color: #1DA1F2
      // Black: #0F1419
      main: "#0F1419",
      light: "#889dff",
      dark: "#000",
    },
    secondary: {
      main: "#514e4b",
      light: "#FFF",
      dark: "#21a1c4",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#FFF",
      // paper: "#2e2c2a"
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e2c2a",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "5px",
        },
      },
    },
  },
});

export default theme;
