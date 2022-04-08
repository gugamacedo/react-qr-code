import { Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import Card from '../src/components/Card'

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
    },
  },

}))

export default function Home() {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" component="h1">
        Welcome to <span>QrCode Generator</span>
      </Typography>

      <Card />
    </Container>
  )
}
