import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette }: Theme) => ({
    root: {},
    buttonContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      '& a': {
        textDecoration: 'none !important',
      },
    },
  }),
  { name: 'Home' }
)
export default useStyles
