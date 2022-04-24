import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette: { common }, spacing }: Theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    formRoot: {
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
  }),
  { name: 'SearchInput' }
)
export default useStyles
