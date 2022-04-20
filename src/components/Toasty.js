import { Snackbar, Alert } from '@mui/material'

const Toasty = ({ open, message, severity, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
      // pra impedir de fechar quando o user clicar fora
    }

    onClose()
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert elevation={6} variant="filled" severity={severity} sx={{ 
          backgroundColor: 'text.secondary',
          color: 'background.default',
          
          '@media (min-width: 1900px)': {
            fontSize: '1.3rem',
          },
        }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toasty