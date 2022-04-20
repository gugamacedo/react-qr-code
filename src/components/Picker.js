import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'

import { SketchPicker } from 'react-color'

const useStyles = makeStyles((theme) => ({
  colors: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%'
  },

  [theme.breakpoints.down(769)] : {
    colors: {
      width: '100%',
    }  
  },

  [theme.breakpoints.down(569)] : {
    colors: {
      fontSize: '0.9rem',
    }  
  }
}))

const Picker = ({ title, showPicker, colorPicker, displayPicker, changePicker }) => {
  const classes = useStyles()

  return (
  <Box className={classes.colors}>

    <span>{title} :</span>
    <Box
      onClick={showPicker}
      sx={{
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: colorPicker,
          
          '@media (max-width: 280px)': {
            width: '20px',
          },

          '@media (min-width: 1900px)': {
            height: '24px',
          }
        }}
      />
    </Box>

    {displayPicker ? (
      <Box
        sx={{
          position: 'absolute',
          zIndex: '2',
        }}
      >
        <Box
          onClick={showPicker}
          sx={{
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }}
        />
        <SketchPicker
          color={colorPicker}
          onChange={changePicker}
          disableAlpha={true}
        />
      </Box>
    ) : null}
  </Box>
  )
}

export default Picker