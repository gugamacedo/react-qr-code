import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: `'Raleway', sans-serif`,
  },

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
