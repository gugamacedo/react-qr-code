import { createTheme } from "@mui/material"  

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
    text: {
      secondary: '#12c671',
    },
  },
})

export default theme