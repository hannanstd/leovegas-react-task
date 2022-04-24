import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette: { common, mode, grey }, spacing }: Theme) => ({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      borderRadius: 5,
      backgroundColor: mode === 'dark' ? grey[900] : grey[100],
      padding: spacing(5, 5, 2),
    },
    channelItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addNewChannel: {
      marginTop: spacing(4),
    },
    footerRoot: {
      borderTop: `1px solid ${mode === 'dark' ? grey[800] : grey[200]}`,
      paddingTop: spacing(2),
      marginTop: spacing(5),
    },
    movieCount: {
      fontSize: '0.7em',
      opacity: 0.6,
      marginLeft: spacing(1),
    },
  }),
  { name: 'MovieChannels' }
)
export default useStyles
