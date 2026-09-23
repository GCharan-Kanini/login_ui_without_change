import { createTheme } from '@mui/material'

// DENCO teal primary colour
const DENCO_TEAL = '#00796b'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: DENCO_TEAL
    },
    background: {
      default: '#fafafa'
    }
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif'
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      }
    }
  }
})

export default theme
