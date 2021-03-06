import { useEffect, useState } from 'react'

import { makeStyles } from '@mui/styles'

import Card from './components/Card'
import Toasty from './components/Toasty'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '30px 0 20px',
    width: '70%',
    height: '100%',
    minHeight: '100vh',
    
    '& span': {
      color: theme.palette.text.secondary,
      fontWeight: 'bold'
    },
  },

  footer: {
    marginTop: '70px',
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
      fontSize: '1.2rem'
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
      width: '90%',
    }   
  }
}))

function App() {
  const classes = useStyles()

  const [colorPicker, setColorPicker] = useState({displayColorPicker: false, displayBgColorPicker: false, bgColor: '#111111', color: '#ff8c00'})
  const [isImage, setImage] = useState({image: "https://api.qrserver.com/v1/create-qr-code/?size=400x400&bgcolor=111111&color=ff8c00&data=https://react-qr-code.vercel.app", download: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAABlBMVEURERH/jADxZgWTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABU0lEQVR4nO3Yy5KDMAxEUfPl/Lk9SUTbLU/mkS26qoKAS8e7LuS09nmdw+u58rzH06OO0R+XV4dAbkNWEKJZ8GruL9ZsCwikNFG8ZnOw44rUilmHQCBOxnx/tShWEAjkl4hNAIFAElEpXgb7RZpxCKQw8bLPkkY3xWvMTSCQsuR7jWFx+l9BIEXImeLlvxaqwy4IpDDJg1u821s0qRUCKU7OFC1tcTV4yNYdAilM1Jh/Z6SizVcgkMIknpWmFbSt9FcBBHJHMlPh3xjNY37kgUCKEzWukM1IaS7zEQ4CKU9WtFKrQGwDgZQnWt/QfuYPBoGUJXuNa4uWz/r51A+BFCXn8PIxbsZqXbEGgRQmb+LlH6QcsX3qg0DKkRyveG75wONxg0AgiUzU7a64QSCQdxHzc5HoH6mEQO5OVGKpUfH6eeqDQAoRL4+bNfk4B4EUJp/XF9q6oyBQjCG+AAAAAElFTkSuQmCC", link: "https://react-qr-code.vercel.app"})
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
  } 

  const changeColorPicker = (color) => setColorPicker({ ...colorPicker, color: color.hex }) 
  
  const changeBgColorPicker = (color) => setColorPicker({ ...colorPicker, bgColor: color.hex }) 

  useEffect(() => {
    setImage(isImage)
  }, [isImage])

  const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))



  const onSubmit = async (values) => {
    setLoading(true)

    let { bgColor, color } = colorPicker
    bgColor = bgColor.replace('#', '')
    color = color.replace('#', '')

    const newImage = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&bgcolor=${bgColor}&color=${color}&data=${values.website}`

    const newLink = await toDataURL(newImage).then(dataUrl => dataUrl)

    setTimeout(() => {
      setImage({
        image: newImage,
        download: newLink,
        link: values.website
      })
      setLoading(false)
      setOpenToasty(true)
    }, 2000)
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        Welcome to <span>React QrCode</span>
      </h1>

      <Card
        isImage={isImage}
        onSubmit={onSubmit}
        loading={loading}
        colorPicker={colorPicker}
        changeColorPicker={changeColorPicker}
        changeBgColorPicker={changeBgColorPicker}
        showPicker={showPicker}
      />

      <footer className={classes.footer}>
        Developed by
        <a href='https://github.com/gugamacedo' target='_blank' rel="noreferrer"> Guga Macedo</a>
      </footer>

      <Toasty
        onClose={() => setOpenToasty(false)}
        open={openToasty}
        severity={'success'}
        message={'Generating QrCode successfully!'}
      />
    </div>
  )
}

export default App
