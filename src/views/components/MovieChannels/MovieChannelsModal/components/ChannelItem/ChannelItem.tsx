import React, { useEffect, useState, VFC } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton/IconButton'
import RenameIcon from '@mui/icons-material/DriveFileRenameOutline'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Cancel'
import useStyles from './ChannelItem.styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export interface ChannelItemProps {
  channelName: string
  moviesCount: number
  prefixComponent?: React.ReactElement | null
  onRemoveClick: (channelName: string) => void
  onRenameSubmit: (channelName: string, newChannelName: string) => void
}

const ChannelItem: VFC<ChannelItemProps> = ({
  channelName,
  moviesCount,
  prefixComponent,
  onRemoveClick,
  onRenameSubmit,
}) => {
  const classes = useStyles({ hasPrefix: !!prefixComponent })
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [newChannelName, setNewChannelName] = useState<string>(channelName)
  useEffect(() => setNewChannelName(channelName), [channelName, isEditMode])

  const onRenameChannel = async () => {
    try {
      await onRenameSubmit(channelName, newChannelName.trim())
      setIsEditMode(false)
    } catch (e) {}
  }

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <>{prefixComponent || <div className={classes.emptyPrefix} />}</>
        }
        label={
          !isEditMode ? (
            <Typography>
              {channelName}
              <span className={classes.moviesCount}>
                (has {moviesCount} Movies)
              </span>
            </Typography>
          ) : (
            <TextField
              autoFocus
              size="small"
              classes={{ root: classes.inputRoot }}
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onRenameChannel().then()}
            />
          )
        }
      />
      <ButtonGroup variant="text">
        {!isEditMode ? (
          <>
            <IconButton
              color="secondary"
              size="small"
              title="Rename Channel"
              onClick={() => setIsEditMode(true)}
            >
              <RenameIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              color="secondary"
              size="small"
              title="Delete Channel"
              onClick={() => onRemoveClick(channelName)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              color="secondary"
              size="small"
              title="Save New Channel"
              onClick={onRenameChannel}
            >
              <SaveAsIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              color="secondary"
              size="small"
              title="Cancel Rename"
              onClick={() => setIsEditMode(false)}
            >
              <CancelIcon fontSize="inherit" />
            </IconButton>
          </>
        )}
      </ButtonGroup>
    </div>
  )
}

export default ChannelItem
