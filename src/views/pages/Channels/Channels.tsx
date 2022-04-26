import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Fab from '@mui/material/Fab'
import FabIcon from '@mui/icons-material/FactCheckOutlined'
import MoviesTable from 'views/components/MoviesTable'
import Typography from '@mui/material/Typography/Typography'
import {
  MovieChannelsModal,
  useMovieChannelsHelpers,
} from 'views/components/MovieChannels'
import useStyles from './Channels.styles'

export default function ScrollableTabsButtonForce() {
  const classes = useStyles()

  const [index, setIndex] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { getAllChannels, getChannelMovies } = useMovieChannelsHelpers()
  const channels: string[] = getAllChannels()

  return (
    <>
      {channels?.length ? (
        <>
          <Tabs
            value={index}
            onChange={(_, index: number) => setIndex(index)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            classes={{
              root: classes.tabsRoot,
              scrollButtons: classes.scrollButtons,
            }}
          >
            {channels.map((channelName) => (
              <Tab
                classes={{ root: classes.tabRoot }}
                key={channelName}
                label={channelName}
              />
            ))}
          </Tabs>
          <MoviesTable
            rows={getChannelMovies(channels[index]) ?? ([] as any)}
          />
        </>
      ) : (
        <Typography>No Channel Found.</Typography>
      )}

      <Fab
        classes={{ root: classes.fabRoot }}
        color="default"
        onClick={() => setOpenModal(!openModal)}
      >
        <FabIcon />
      </Fab>
      <MovieChannelsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}
