import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette: { common, mode, grey } }: Theme) => ({
    alertRoot: {
      backgroundColor: 'transparent !important',
      display: 'flex !important',
      justifyContent: 'center !important',
      padding: 0,
      margin: 0,
    },
    alertIcon: {
      fontSize: '50px !important',
    },
    dialogTitle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  { name: 'ConfirmModal' }
)
export default useStyles
