import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ spacing }: Theme) => ({
    root: {
      marginTop: 'auto',
    },
  }),
  { name: 'Footer' }
)
export default useStyles
