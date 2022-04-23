import { createTheme } from '@mui/material/styles'
import palette from './palette'

// A custom theme for this app
const theme = createTheme({
  spacing: 4,
  palette: palette('dark'),
})

export default theme
