import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { blue, red } from '@mui/material/colors'

const useStyles = makeStyles(
  ({ spacing, palette: { mode, common, grey } }: Theme) => ({
    root: {
      marginRight: spacing(1.5),
    },
    list: {},
    menuItem: {
      padding: '0 !important',
      minHeight: 'unset !important',
    },
    item: {
      padding: spacing(2, 3),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      gap: spacing(1.5),
      textDecoration: 'none',
      width: '100%',
      color: mode === 'dark' ? common.white : grey[800],
    },
    activeItem: {
      color: mode === 'dark' ? red[400] : blue[800],
    },
    icon: {
      display: 'flex',
      '& > *': {
        color: 'inherit',
        fontSize: '25px !important',
      },
    },
    label: {
      color: 'inherit',
      fontSize: '0.9em !important',
    },
  }),
  { name: 'HeaderMobileLinks' }
)
export default useStyles
