import { Formik } from 'formik'
import * as yup from 'yup'

import { makeStyles } from '@mui/styles'
import { Button, TextField, Box, CircularProgress } from '@mui/material'

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'

import Picker from './Picker'

const useStyles = makeStyles((theme) => ({
  image: {
    height: '300px',
    width: '300px',
    margin: '30px 0',
  },

  form: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
  },

  [theme.breakpoints.up(1899)]: {
    form: {
      width: '60%',
      fontSize: '1.3rem',
      gap: '30px',

      '& button': {
        fontSize: '1.2rem',
      },

      '& label, input': {
        fontSize: '1.3rem',
      },
    },
    image: {
      width: '400px',
      height: '400px',
    },
  },

  [theme.breakpoints.down(569)]: {
    image: {
      width: '200px',
      height: '200px',
      margin: '15px 0',
    },

    form: {
      width: '70%',
    },
  },
}))

const validationSchema = yup.object().shape({
  website: yup.string().required('Required field').url('Invalid/Incomplete link'),
})

const Card = ({
  isImage,
  onSubmit,
  loading,
  colorPicker,
  changeColorPicker,
  changeBgColorPicker,
  showPicker,
}) => {
  const classes = useStyles()

  return (
    <>
      <img src={isImage.image} alt="QrCode" className={classes.image} />

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
              title={'Background'}
              showPicker={() => showPicker('bgcolor')}
              colorPicker={colorPicker.bgColor}
              displayPicker={colorPicker.displayBgColorPicker}
              changePicker={changeBgColorPicker}
            />

            <Box
              sx={{
                display: 'flex',
                gap: '0.5em',
                alignItems: 'center',
                margin: 0,

                '@media (min-width: 1900px)': {
                  gap: '1.5em',
                },
              }}
            >
              <Box sx={{ m: 1, position: 'relative', margin: 0 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{
                    '@media (max-width: 568px)': {
                      fontSize: '0.8rem',
                    },
                  }}
                >
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

              <a href={isImage.download} download={`${isImage.link}.png`}>
                <DownloadForOfflineIcon
                  fontSize="large"
                  color="primary"
                  sx={{
                    '@media (min-width: 1900px)': {
                      height: '1.3em',
                      width: '1.3em',
                    },
                  }}
                />
              </a>
              
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Card
