import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette: { common, mode, grey }, spacing }: Theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing(1),
      '& > div': {
        width: '100%',
      },
    },
  }),
  { name: 'AddNewChannel' }
)
export default useStyles
