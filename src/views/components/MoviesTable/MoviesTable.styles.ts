import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles(
  ({ palette: { common, mode, grey }, spacing }: Theme) => ({
    tableRow: {
      height: 190,
      '& > *': { borderBottom: 'unset !important' },
    },
    thumbnailCell: {
      width: 100,
      '& > img': {
        width: 100,
        cursor: 'pointer',
      },
    },
    hiddenCell: {
      padding: '0 !important',
      '& > div': {
        padding: spacing(0, 4, 5),
      },
    },
  }),
  { name: 'MoviesTable' }
)
export default useStyles
