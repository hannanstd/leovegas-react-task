import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette: { common, mode, grey } }: Theme) => ({
    root: {},
    paperRoot: {
      backgroundColor: `${
        mode === 'dark' ? common.black : grey[100]
      } !important`,
    },
    paginationItem: {
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 5px',
      cursor: 'pointer',
      '& img': {
        marginBottom: '5px',
        borderRadius: '3px',
      },
    },
    headerRoot: {
      display: 'flex',
      flexDirection: 'row-reverse',
      height: 50,
      paddingTop: '7px !important',
      paddingBottom: '7px !important',
    },
    bodyRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        margin: 'auto',
        width: 'auto',
        maxHeight: '100%',
        maxWidth: '100%',
      },
    },
    footerRoot: {
      justifyContent: 'center !important',
    },
  }),
  { name: 'ImageSlider' }
)
export default useStyles
