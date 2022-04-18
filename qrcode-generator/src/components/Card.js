import { Formik } from 'formik'
import * as yup from 'yup'

import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import { Button, TextField, Box, CircularProgress } from '@mui/material'
import { SketchPicker } from 'react-color'

const useStyles = makeStyles(() => ({
  image: {
    margin: '30px 0',
  },

  form: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
  },

  colors: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%'
  }
}))

const validationSchema = yup.object().shape({
  website: yup.string().required('Campo obrigatório').url('URL inválida'),
})

const Card = ({
  image,
  onSubmit,
  loading,
  handleColorPicker,
  colorPicker,
  changeColorPicker,
  handleBgColorPicker,
  changeBgColorPicker,
}) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.image}>
        <Image src={image} alt="QrCode" width={'300px'} height={'300px'} />
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
              label="Enter the url"
              variant="filled"
              placeholder="https://github.com"
              onChange={handleChange}
              name="website"
              value={values.website}
              error={!!errors.website}
              helperText={errors.website}
            />

            <Box className={classes.colors}>

              <span>Color:</span>
              <Box
                onClick={handleColorPicker}
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
                    background: colorPicker.color,
                  }}
                />
              </Box>

              {colorPicker.displayColorPicker ? (
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: '2',
                  }}
                >
                  <Box
                    onClick={handleColorPicker}
                    sx={{
                      position: 'fixed',
                      top: '0px',
                      right: '0px',
                      bottom: '0px',
                      left: '0px',
                    }}
                  />
                  <SketchPicker
                    color={colorPicker.color}
                    onChange={changeColorPicker}
                    disableAlpha={true}
                  />
                </Box>
              ) : null}
            </Box>

            <Box className={classes.colors}>

            <span>Bg Color:</span>
            <Box
              onClick={handleBgColorPicker}
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
                  background: colorPicker.bgColor,
                }}
              />
            </Box>

            {colorPicker.displayBgColorPicker ? (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: '2',
                }}
              >
                <Box
                  onClick={handleBgColorPicker}
                  sx={{
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                  }}
                />
                <SketchPicker
                  color={colorPicker.bgColor}
                  onChange={changeBgColorPicker}
                  disableAlpha={true}
                />
              </Box>
            ) : null}
            </Box>

            <Box sx={{ m: 1, position: 'relative' }}>
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
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
