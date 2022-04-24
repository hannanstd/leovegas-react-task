import React, { useEffect, useState, VFC } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Loading from 'views/components/Loading'
import Pagination from '@mui/material/Pagination/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import useStyles from './ImageSlider.styles'
import IconButton from '@mui/material/IconButton/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export interface ImageSliderProps {
  imageUrls: string[]
  show: boolean
  onClose: () => void
  isLoading: boolean
}

const ImageSlider: VFC<ImageSliderProps> = ({
  imageUrls,
  show = false,
  onClose,
  isLoading = false,
}) => {
  const classes = useStyles()
  const [index, setIndex] = useState<number>(0)
  useEffect(() => setIndex(0), [imageUrls])

  return (
    <Dialog
      open={show}
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
        ) : !imageUrls?.length ? (
          <div>No Images found</div>
        ) : (
          <img src={imageUrls?.[index]} alt="" />
        )}
      </DialogContent>

      {imageUrls?.length && (
        <DialogActions className={classes.footerRoot}>
          <Pagination
            size="small"
            count={imageUrls?.length || 0}
            page={index + 1}
            onChange={(_, index) => setIndex(index - 1)}
            renderItem={({ ...item }: any) => (
              <div className={classes.paginationItem}>
                <PaginationItem {...item} />
                {item.type === 'page' && (
                  <img
                    src={imageUrls[item?.page - 1]}
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
