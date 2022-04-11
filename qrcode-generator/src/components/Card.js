import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import { Button, TextField, Box } from '@mui/material'

const useStyles = makeStyles(() => ({
  image: {
    margin: '30px 0',
  },

  form: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& button': {
      margin: '30px 0 0',
    }
  },
}))

const validationSchema = yup.object().shape({
  website: yup.string().required('Campo obrigatório').url('URL inválida'),
})

const Card = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState('/favicon.svg')

  useEffect(() => {
    setImage(image)
  }
    
  , [image])

  return (
    <>
      <Box className={classes.image}>
        <Image
          src={image}
          alt="QrCode"
          width={'300px'}
          height={'300px'}
        />
      </Box>

      <Formik
        initialValues={{
          website: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setLoading(true)

          axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&bgcolor=424242&color=00ff88&data=${values.website}`)
          .then(response => {
            const data = response.request.responseURL
            setImage(data)
            setLoading(false)
          })

        }}
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
              error={errors.website}
              helperText={errors.website}
            />

            <Button variant="contained" color="primary" type="submit">
              {loading ? 'Wait...' : 'Generate'}
            </Button>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Card
