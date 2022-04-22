import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette }: Theme) => ({
    root: {},
    searchInputContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    resultContainer: {},
  }),
  { name: 'Search' }
)
export default useStyles
