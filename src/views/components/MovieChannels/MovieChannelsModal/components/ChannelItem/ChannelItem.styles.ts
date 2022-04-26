import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles<any, any>(
  ({ palette: { common, mode, grey }, spacing }: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > label': {
        cursor: ({ hasPrefix }) =>
          hasPrefix ? undefined : 'default !important',
      },
    },
    emptyPrefix: {
      padding: '40px 0 0 11px',
      display: 'block',
      textAlign: 'center',
    },
    inputRoot: {
      '& input': {
        padding: spacing(1, 2, 1),
      },
    },
    moviesCount: {
      fontSize: '0.7em',
      opacity: 0.6,
      marginLeft: spacing(1),
      '@media (max-width:480px)': {
        display: 'none',
      },
    },
  }),
  { name: 'MovieChannelsModal' }
)
export default useStyles
