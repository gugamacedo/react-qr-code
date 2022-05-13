import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
