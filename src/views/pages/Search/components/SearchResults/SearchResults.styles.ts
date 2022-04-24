import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette }: Theme) => ({
    root: {
      width: '100%',
    },
  }),
  { name: 'SearchResults' }
)
export default useStyles
