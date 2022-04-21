import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles' 
import CssBaseline from '@mui/material/CssBaseline' 

import theme from '../src/theme'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>React QrCode</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="title" content="React QrCode" />
        <meta name="description" content="Generate a custom QrCode!" />
        <meta name="image" content="" />
        <meta property="og:image" content="https://raw.githubusercontent.com/gugamacedo/gugamacedo.github.io/main/img/react-qr-code.png" />
        <meta name="url" content="https://react-qr-code.vercel.app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
