import React, { VFC } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button'
import { toast } from 'views/components/Toast'
import { confirm } from 'views/components/ConfirmModal'
import { MovieIdType, MovieObjectType } from 'types/Movies.types'
import useStyles from './MovieChannelsModal.styles'
import { useMovieChannelsHelpers } from '../hooks'
import AddNewChannel from './components/AddNewChannel'
import ChannelItem from './components/ChannelItem'
import Checkbox from '@mui/material/Checkbox'
import theme from 'theme'
import { useMediaQuery } from '@mui/material'

export interface MovieChannelsProps {
  movieObject?: MovieObjectType
  open: boolean
  onClose: () => void
}

const MovieChannelsModal: VFC<MovieChannelsProps> = ({
  open = false,
  movieObject,
  onClose,
}) => {
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const movieId: MovieIdType | undefined = movieObject?.id
  const movieTitle: string | undefined = movieObject?.title

  const methods = useMovieChannelsHelpers()
  const channelNames: Array<string> = methods.getAllChannels()

  const onCheckboxChange = (checked: boolean, channelName: string) => {
    if (!movieObject || !movieId) return
    const toastIdx = `movie-channels-checkbox-change-${channelName}-${movieId}`
    if (checked) {
      methods.addMovieToChannels(movieObject, [channelName])
      const message: string = `${movieTitle} added to ${channelName}`
      toast({ idx: toastIdx, type: 'success', message })
    } else {
      methods.removeMovieFromChannels(movieId, [channelName])
      const message: string = `${movieTitle} removed from ${channelName}`
      toast({ idx: toastIdx, type: 'warning', message })
    }
  }

  const onRemoveChannel = (channelName: string): void => {
    confirm({
      type: 'error',
      title: `Are you sure you want to remove channel ${channelName}?`,
      confirmText: 'Yes, Remove',
      onConfirm: () => {
        methods.removeChannel(channelName)
        toast({ type: 'warning', message: `Channel ${channelName} removed` })
      },
    })
  }

  const onRenameChannel = (
    channelName: string,
    newChannelName: string
  ): void => {
    if (channelName === newChannelName) return

    if (channelNames.includes(newChannelName)) {
      const message: string = `${newChannelName} already exists`
      toast({ type: 'error', message })
      throw new Error(message)
    }

    methods.renameChannel(channelName, newChannelName)
    toast({
      type: 'success',
      message: `${channelName} renamed to ${newChannelName}`,
    })
  }

  const onAddChannel = (channelName: string): void => {
    if (channelNames.includes(channelName)) {
      toast({ type: 'info', message: `${channelName} already exists` })
    } else if (!movieObject) {
      methods.addChannel(channelName)
      toast({ type: 'success', message: `Channel ${channelName} Added` })
    } else {
      methods.addMovieToChannels(movieObject, [channelName])
      toast({
        type: 'success',
        message: `${movieTitle} added to ${channelName}`,
      })
    }
  }

  return (
    <Dialog open={open} fullScreen={fullScreen} scroll="paper">
      <DialogTitle>
        {movieTitle ? `Channels for ${movieTitle}` : 'All Channels'}
      </DialogTitle>
      <DialogContent className={classes.root} dividers>
        <FormGroup className={channelNames.length ? classes.formGroupRoot : ''}>
          {channelNames.map((channelName, index) => (
            <ChannelItem
              key={channelName}
              channelName={channelName}
              moviesCount={methods.getChannelMovies(channelName).length}
              onRemoveClick={onRemoveChannel}
              onRenameSubmit={onRenameChannel}
              prefixComponent={
                !movieId ? null : (
                  <Checkbox
                    checked={methods.isMovieInChannel(movieId, channelName)}
                    onChange={(e, checked) =>
                      onCheckboxChange(checked, channelName)
                    }
                  />
                )
              }
            />
          ))}
        </FormGroup>
        <AddNewChannel onSubmit={onAddChannel} />
      </DialogContent>
      <DialogActions className={classes.footerRoot}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MovieChannelsModal
