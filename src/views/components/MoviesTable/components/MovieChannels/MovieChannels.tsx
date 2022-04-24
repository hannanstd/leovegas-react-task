import React, { useState, VFC } from 'react'
import Modal from '@mui/material/Modal'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton/IconButton'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import { toast } from 'views/components/Toast'
import useStyles from './MovieChannels.styles'
import { useMovieChannelsHelpers } from './hooks'
import { MovieIdType, MovieObjectType } from '../../MoviesTable.types'

export interface MovieChannelsProps {
  movieObject: MovieObjectType
  onClose: () => void
}

const MovieChannels: VFC<MovieChannelsProps> = ({ movieObject, onClose }) => {
  const classes = useStyles()
  const movieId: MovieIdType = movieObject?.id
  const movieTitle: string = movieObject?.title

  const {
    getAllChannels,
    removeChannel,
    isMovieInChannel,
    addMovieToChannels,
    removeMovieFromChannels,
    getChannelMovies,
  } = useMovieChannelsHelpers()

  const [newChannelName, setNewChannelName] = useState<string>('')
  const channelNames: Array<string> = getAllChannels()

  const onCheckboxChange = (checked: boolean, channelName: string) => {
    const toastIdx = `movie-channels-checkbox-change-${channelName}`
    if (checked) {
      addMovieToChannels(movieObject, [channelName])
      toast({
        idx: toastIdx,
        type: 'success',
        message: `"${movieTitle}" added to "${channelName}"`,
      })
    } else {
      removeMovieFromChannels(movieId, [channelName])
      toast({
        idx: toastIdx,
        type: 'warning',
        message: `"${movieTitle}" removed from "${channelName}"`,
      })
    }
  }

  const onAddNewChannel = (): void => {
    addMovieToChannels(movieObject, [newChannelName])
    setNewChannelName('')
    toast({
      type: 'success',
      message: `Channel "${newChannelName}" created and "${movieTitle}" added to channel`,
    })
  }

  const onRemoveChannel = (channelName: string): void => {
    removeChannel(channelName)
    toast({
      type: 'warning',
      message: `Channel "${channelName}" removed`,
    })
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
                      (has {getChannelMovies(channelName).length} Movies)
                    </span>
                  </>
                }
                control={
                  <Checkbox
                    value={channelName}
                    checked={isMovieInChannel(movieId, channelName)}
                    onChange={(e) =>
                      onCheckboxChange(e.target.checked, channelName)
                    }
                  />
                }
              />
              <IconButton
                color="secondary"
                size="small"
                title="Delete Channel"
                onClick={() => onRemoveChannel(channelName)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
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

export default MovieChannels
