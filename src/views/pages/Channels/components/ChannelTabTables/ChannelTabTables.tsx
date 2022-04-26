import React, { useState, VFC } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import MoviesTable from 'views/components/MoviesTable'
import Typography from '@mui/material/Typography/Typography'
import { useMovieChannelsHelpers } from 'views/components/MovieChannels'
import useStyles from './ChannelTabTables.styles'

const ChannelTabTables: VFC = () => {
  const classes = useStyles()
  const [index, setIndex] = useState<number>(0)

  const { getAllChannels, getChannelMovies } = useMovieChannelsHelpers()
  const channelNames: string[] = getAllChannels()

  return channelNames?.length ? (
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
        {channelNames.map((channelName) => (
          <Tab
            key={channelName}
            label={channelName}
            classes={{ root: classes.tabRoot }}
          />
        ))}
      </Tabs>
      <MoviesTable
        rows={getChannelMovies(channelNames[index]) ?? ([] as any)}
      />
    </>
  ) : (
    <Typography>No Channel Found.</Typography>
  )
}

export default ChannelTabTables
