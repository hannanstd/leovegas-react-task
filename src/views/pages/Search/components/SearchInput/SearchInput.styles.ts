import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette: { common }, spacing }: Theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
    },
    autoCompleteRoot: {
      '& .MuiAutocomplete-popupIndicator svg': {
        color: common.black,
      },
    },
    paperRoot: {
      marginRight: 2,
      marginLeft: 2,
    },
    inputRoot: {
      backgroundColor: common.white,
      paddingRight: `35px !important`,
    },
    input: {
      color: `${common.black} !important`,
    },
    viewAll: {
      width: '100%',
      cursor: 'pointer',
      padding: spacing(2, 3),
    },
    thumbnail: {
      width: 50,
      marginRight: 15,
    },
  }),
  { name: 'SearchInput' }
)
export default useStyles
