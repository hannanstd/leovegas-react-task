import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette }: Theme) => ({
    root: {
      width: '100%',
      height: '500px',
    },
  }),
  { name: 'SearchResultTable' }
)
export default useStyles
