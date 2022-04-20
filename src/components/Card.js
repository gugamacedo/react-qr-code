import { Formik } from 'formik'
import * as yup from 'yup'

import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import { Button, TextField, Box, CircularProgress } from '@mui/material'

import Picker from './Picker'

const useStyles = makeStyles((theme) => ({
  image: {
    margin: '30px 0',
  },

  form: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',

    '& button': {
      marginTop: '20px'
    }
  },
  
  [theme.breakpoints.up(1899)] : {
    form: {
      width: '60%',
      fontSize: '1.3rem',
      gap: '30px',
  
      '& button': {
        marginTop: '20px',
        fontSize: '1.2rem',
      },

      '& label, input': {
        fontSize: '1.3rem',
      }
    },
  }, 

  [theme.breakpoints.down(1900)] : {
    image: {
      width: '300px',
    },
  }, 

  [theme.breakpoints.down(569)] : {
    image: {
      width: '200px',
      margin: '15px 0'
    },
    
    form: {
      width: '70%',
    }
  }
}))

const validationSchema = yup.object().shape({
  website: yup.string().required('Required field').url('Invalid/Incomplete link'),
})

const Card = ({
  image,
  onSubmit,
  loading,
  colorPicker,
  changeColorPicker,
  changeBgColorPicker,
  showPicker
}) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.image}>
        <Image src={image} alt="QrCode image" width={'400px'} height={'400px'} quality={100} />
      </Box>

      <Formik
        initialValues={{
          website: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              size="small"
              fullWidth
              label="Insert the link"
              variant="filled"
              placeholder="https://github.com/gugamacedo"
              onChange={handleChange}
              name="website"
              value={values.website}
              error={!!errors.website}
              helperText={errors.website}
            />

            <Picker 
              title={'Color'}
              showPicker={() => showPicker('color')}
              colorPicker={colorPicker.color}
              displayPicker={colorPicker.displayColorPicker}
              changePicker={changeColorPicker}
            />

            <Picker 
              title={'Bg Color'}
              showPicker={() => showPicker('bgcolor')}
              colorPicker={colorPicker.bgColor}
              displayPicker={colorPicker.displayBgColorPicker}
              changePicker={changeBgColorPicker}
            />

            <Box sx={{ m: 1, position: 'relative' }}>
              <Button variant="contained" color="primary" type="submit" disabled={loading} sx={{
                '@media (max-width: 568px)': {
                  fontSize: '0.8rem',
                },
              }}>
                {loading ? 'Wait...' : 'Generate'}
              </Button>

              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'text.secondary',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Card
