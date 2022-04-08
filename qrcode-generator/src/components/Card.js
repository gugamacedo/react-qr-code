import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Box } from '@mui/system'

const useStyles = makeStyles(() => ({
  image: {
    margin: '30px 0',
  },

  wrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    gap: '20px',
  },
}))

const Card = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  const handleInputChange = () => {}
  const handleFormSubmit = () => {}

  return (
    <>
      <Box className={classes.image}>
        <Image
          src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&bgcolor=424242&color=00ff88&data=https://mui.com/pt/components/"
          alt="QrCode"
          width={'300px'}
          height={'300px'}
        />
      </Box>

      <div className={classes.wrapper}>
        <TextField
          size="small"
          fullWidth
          label="Enter the link"
          name="link"
          variant="outlined"
          onChange={handleInputChange}
          type="url"
        />

        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
          {loading ? 'Aguarde...' : 'Generate'}
        </Button>
      </div>
    </>
  )
}

export default Card
