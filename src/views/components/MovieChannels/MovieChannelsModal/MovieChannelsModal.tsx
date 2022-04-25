import React, { useState, VFC } from 'react'
import Modal from '@mui/material/Modal'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton/IconButton'
import RenameIcon from '@mui/icons-material/DriveFileRenameOutline'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import { toast } from 'views/components/Toast'
import { MovieIdType, MovieObjectType } from 'views/components/MoviesTable'
import useStyles from './MovieChannelsModal.styles'
import { useMovieChannelsHelpers } from '../hooks'

export interface MovieChannelsProps {
  movieObject: MovieObjectType
  onClose: () => void
}

const MovieChannelsModal: VFC<MovieChannelsProps> = ({
  movieObject,
  onClose,
}) => {
  const classes = useStyles()
  const movieId: MovieIdType = movieObject?.id
  const movieTitle: string = movieObject?.title

  const [newChannelName, setNewChannelName] = useState<string>('')

  const methods = useMovieChannelsHelpers()
  const channelNames: Array<string> = methods.getAllChannels()

  const onCheckboxChange = (checked: boolean, channelName: string) => {
    const toastIdx = `movie-channels-checkbox-change-${channelName}-${movieId}`
    if (checked) {
      methods.addMovieToChannels(movieObject, [channelName])
      const message: string = `"${movieTitle}" added to "${channelName}"`
      toast({ idx: toastIdx, type: 'success', message })
    } else {
      methods.removeMovieFromChannels(movieId, [channelName])
      const message: string = `"${movieTitle}" removed from "${channelName}"`
      toast({ idx: toastIdx, type: 'warning', message })
    }
  }

  const onAddNewChannel = (): void => {
    methods.addMovieToChannels(movieObject, [newChannelName])
    setNewChannelName('')
    toast({
      type: 'success',
      message: `"${movieTitle}" added to "${newChannelName}"`,
    })
  }

  const onRemoveChannel = (channelName: string): void => {
    //if (window.confirm('Are you sure you want to remove this channel?')) {
    methods.removeChannel(channelName)
    toast({ type: 'warning', message: `Channel "${channelName}" removed` })
    //}
  }

  return (
    <Modal open={!!movieId}>
      <div className={classes.root}>
        <FormGroup>
          {channelNames.map((channelName) => (
            <div key={channelName} className={classes.channelItem}>
              <FormControlLabel
                label={
                  <>
                    {channelName}
                    <span className={classes.movieCount}>
                      (has {methods.getChannelMovies(channelName).length}{' '}
                      Movies)
                    </span>
                  </>
                }
                control={
                  <Checkbox
                    value={channelName}
                    checked={methods.isMovieInChannel(movieId, channelName)}
                    onChange={(e, checked) =>
                      onCheckboxChange(checked, channelName)
                    }
                  />
                }
              />
              <ButtonGroup variant="text">
                <IconButton
                  color="secondary"
                  size="small"
                  title="Rename Channel"
                  //onClick={() => onRemoveChannel(channelName)}
                >
                  <RenameIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  color="secondary"
                  size="small"
                  title="Delete Channel"
                  onClick={() => onRemoveChannel(channelName)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </ButtonGroup>
            </div>
          ))}

          <div className={`${classes.channelItem} ${classes.addNewChannel}`}>
            <TextField
              size="small"
              label="Add New Channel"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
            />
            <IconButton
              color="secondary"
              size="small"
              title="Add New Channel"
              disabled={
                !newChannelName || channelNames.includes(newChannelName)
              }
              onClick={onAddNewChannel}
            >
              <AddIcon fontSize="medium" />
            </IconButton>
          </div>
        </FormGroup>

        <div className={classes.footerRoot}>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  )
}

export default MovieChannelsModal
