import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = (props: any) =>
  makeStyles(
    ({ palette: { common, mode, grey } }: Theme) => ({
      root: {
        backgroundColor: mode === 'dark' ? common.black : grey[100],
        position: 'fixed',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        ...(!props.fullScreen && {
          top: 'auto',
          right: 'auto',
          left: '50px',
          bottom: '20px',
          width: 480,
          height: 360,
        }),
        '@media (max-width:480px)': {
          width: '100vw',
          height: 'auto',
          minHeight: 200,
          left: 0,
          bottom: 0,
        },
      },
      playerRoot: {
        flex: 1,
        width: '100%',
      },
      topBar: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
      paginationRoot: {
        paddingTop: '8px',
        paddingBottom: '5px',
      },
    }),
    { name: 'FloatingVideoPlayer' }
  )
export default useStyles
