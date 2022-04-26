import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { blueGrey, red } from '@mui/material/colors'

const useStyles = makeStyles(
  ({ spacing, palette: { mode, common, grey } }: Theme) => ({
    root: {
      marginRight: spacing(5),
    },
    list: {
      display: 'flex',
      gap: spacing(5),
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textDecoration: 'none',
      height: '100%',
      color: mode === 'dark' ? common.white : grey[100],
    },
    activeItem: {
      color: mode === 'dark' ? red[400] : grey[100],
      borderBottom: `2px solid ${
        mode === 'dark' ? red[400] : blueGrey['A100']
      }`,
    },
    icon: {
      height: 30,
      '& > *': {
        color: 'inherit',
        fontSize: '25px !important',
      },
    },
    label: {
      color: 'inherit',
      fontSize: '0.6em !important',
    },
  }),
  { name: 'HeaderDesktopLinks' }
)
export default useStyles
