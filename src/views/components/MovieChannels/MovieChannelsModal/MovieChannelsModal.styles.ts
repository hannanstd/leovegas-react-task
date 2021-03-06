import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette: { common, mode, grey }, spacing }: Theme) => ({
    root: {
      paddingBottom: `${spacing(3)} !important`,
    },
    formGroupRoot: {
      marginBottom: spacing(5),
    },
    footerRoot: {},
  }),
  { name: 'MovieChannelsModal' }
)
export default useStyles
