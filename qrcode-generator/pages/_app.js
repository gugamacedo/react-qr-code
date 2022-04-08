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
        <title>QrCode Generator</title>
        <meta name="description" content="Generate a qrcode from some website" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
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
