import React, { useEffect, useState, VFC } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useQuery } from 'hooks'
import Loading from 'views/components/Loading'
import Pagination from '@mui/material/Pagination/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import useStyles from './ImageSlider.styles'
import IconButton from '@mui/material/IconButton/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export interface ImageSliderProps {
  id: string | number
  onClose: () => void
}

const ImageSlider: VFC<ImageSliderProps> = ({ id, onClose }) => {
  const classes = useStyles()
  const [index, setIndex] = useState<number>(0)

  const { data: urls, isLoading } = useQuery('movieImages', {
    variables: { id },
  })

  useEffect(() => setIndex(0), [urls])

  return (
    <Dialog
      open={true}
      fullScreen
      onClose={() => onClose?.()}
      classes={{ root: classes.root, paper: classes.paperRoot }}
    >
      <DialogTitle className={classes.headerRoot}>
        <IconButton size="small" color="primary" onClick={() => onClose?.()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={classes.bodyRoot}>
        {isLoading ? (
          <Loading />
        ) : !urls?.length ? (
          <div>No Images found</div>
        ) : (
          <img src={urls?.[index]} alt="" />
        )}
      </DialogContent>

      {urls?.length && (
        <DialogActions className={classes.footerRoot}>
          <Pagination
            size="small"
            count={urls?.length || 0}
            page={index + 1}
            onChange={(_, index) => setIndex(index - 1)}
            renderItem={({ ...item }: any) => (
              <div className={classes.paginationItem}>
                <PaginationItem {...item} />
                {item.type === 'page' && (
                  <img
                    src={urls[item?.page - 1]}
                    {...item}
                    alt=""
                    title={item?.['aria-label']}
                    width={35}
                    height={45}
                  />
                )}
              </div>
            )}
          />
        </DialogActions>
      )}
    </Dialog>
  )
}

export default ImageSlider
