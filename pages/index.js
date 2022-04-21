import { useEffect, useState } from 'react'

import { Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import Card from '../src/components/Card'
import Toasty from '../src/components/Toasty'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: '30px 0 20px',
    width: '70%',
    height: '100%',
    
    '& span': {
      color: theme.palette.text.secondary,
      fontWeight: 'bold'
    },
  },

  footer: {
    marginTop: '60px',
    fontSize: '0.8rem',

    '& a': {
      color: theme.palette.text.secondary,
      fontWeight: 'bold',
      textDecoration: 'none'
    },
  },

  [theme.breakpoints.up(1899)] : {
    title: {
      fontSize: '2.8rem',
    },

    footer: {
      fontSize: '1rem'
    },
  },  

  [theme.breakpoints.down(769)] : {
    title: {
      fontSize: '1.6rem',
      textAlign: 'center',
      padding: '0 10px'
    }  
  },

  [theme.breakpoints.down(569)] : {
    title: {
      fontSize: '1.3rem',
    },
    container: {
      width: '80%',
    }   
  }
}))

const Home = () => {
  const classes = useStyles()

  const [colorPicker, setColorPicker] = useState({displayColorPicker: false, displayBgColorPicker: false, bgColor: '#424242', color: '#00ff88'})
  const [image, setImage] = useState('/favicon.svg')
  const [loading, setLoading] = useState(false)
  const [openToasty, setOpenToasty] = useState(false)

  const showPicker = (field) => {
    setColorPicker(
      field === 'color' ? { 
        ...colorPicker, 
        displayColorPicker: !colorPicker.displayColorPicker,
      } 
      : { 
        ...colorPicker, 
        displayBgColorPicker: !colorPicker.displayBgColorPicker,
      }
    ) 
    console.log(colorPicker)

  } 

  const changeColorPicker = (color) => setColorPicker({ ...colorPicker, color: color.hex }) 
  
  const changeBgColorPicker = (color) => setColorPicker({ ...colorPicker, bgColor: color.hex }) 

  useEffect(() => {
    setImage(image)
  }, [image])

  const onSubmit = (values) => {
    setLoading(true)

    const { bgColor, color } = colorPicker
    bgColor = bgColor.replace('#', '')
    color = color.replace('#', '')

    const newImage = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&bgcolor=${bgColor}&color=${color}&data=${values.website}`

    setTimeout(() => {
      setImage(newImage)
      setLoading(false)
      setOpenToasty(true)
    }, 2000)
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Welcome to <span>React QrCode</span>
      </Typography>

      <Card
        image={image}
        onSubmit={onSubmit}
        loading={loading}
        colorPicker={colorPicker}
        changeColorPicker={changeColorPicker}
        changeBgColorPicker={changeBgColorPicker}
        showPicker={showPicker}
      />

      <footer className={classes.footer}>
        Developed by <a href='https://github.com/gugamacedo'>Guga Macedo</a>
      </footer>

      <Toasty
        onClose={() => setOpenToasty(false)}
        open={openToasty}
        severity={'success'}
        message={'Generating QrCode successfully!'}
      />
    </Container>
  )
}

export default Home
