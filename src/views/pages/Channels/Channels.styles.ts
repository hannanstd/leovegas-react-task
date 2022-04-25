import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette, spacing }: Theme) => ({
    tabsRoot: {
      marginBottom: spacing(2),
    },
    tabRoot: {
      textTransform: 'none !important' as any,
    },
    scrollButtons: {
      '&.Mui-disabled': {
        opacity: '0.3 !important',
      },
    },
  }),
  { name: 'Channels' }
)
export default useStyles
