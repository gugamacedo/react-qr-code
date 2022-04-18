import { useEffect, useState } from 'react'

import { Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import Card from '../src/components/Card'
import Toasty from '../src/components/Toasty'

const useStyles = makeStyles((theme) => ({
  span: {},

  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: '30px 0',

    '& span': {
      color: theme.palette.text.secondary,
      fontWeight: 'bold'
    },
  },
}))

const Home = () => {
  const classes = useStyles()

  const [colorPicker, setColorPicker] = useState({displayColorPicker: false, displayBgColorPicker: false, bgColor: '#424242', color: '#00ff88'})
  const [image, setImage] = useState('/favicon.svg')
  const [loading, setLoading] = useState(false)
  const [openToasty, setOpenToasty] = useState(false)

  const handleColorPicker = () => setColorPicker({ ...colorPicker, displayColorPicker: !colorPicker.displayColorPicker }) 

  const handleBgColorPicker = () => setColorPicker({ ...colorPicker, displayBgColorPicker: !colorPicker.displayBgColorPicker }) 

  const changeColorPicker = (color) => setColorPicker({ ...colorPicker, color: color.hex }) 
  
  const changeBgColorPicker = (color) => setColorPicker({ ...colorPicker, bgColor: color.hex }) 

  useEffect(() => {
    setImage(image)
  }, [image])

  const onSubmit = (values) => {
    setLoading(true)

    const data = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&bgcolor=${(colorPicker.bgColor).replace('#', '')}&color=${(colorPicker.color).replace('#', '')}&data=${values.website}`

    setTimeout(() => {
      setImage(data)
      setLoading(false)
      setOpenToasty(true)
    }, 2000)
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" component="h1">
        Welcome to <span>QrCode Generator</span>
      </Typography>

      <Card
        image={image}
        onSubmit={onSubmit}
        loading={loading}
        changeColorPicker={changeColorPicker}
        handleColorPicker={handleColorPicker}
        colorPicker={colorPicker}
        handleBgColorPicker={handleBgColorPicker}
        changeBgColorPicker={changeBgColorPicker}
      />

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
