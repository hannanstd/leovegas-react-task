import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ spacing }: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      padding: spacing(8, 0),
    },
  }),
  { name: 'Layout' }
)
export default useStyles
