import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ spacing }: Theme) => ({
    root: {
      marginTop: 'auto',
      marginBottom: spacing(5),
    },
  }),
  { name: 'Footer' }
)
export default useStyles
