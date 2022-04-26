import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette, spacing }: Theme) => ({
    fabRoot: {
      position: 'fixed !important' as any,
      right: 50,
      bottom: 50,
    },
  }),
  { name: 'Channels' }
)
export default useStyles
