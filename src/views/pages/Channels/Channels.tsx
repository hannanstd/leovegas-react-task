import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import MoviesTable from 'views/components/MoviesTable'
import { useMovieChannelsHelpers } from 'views/components/MovieChannels'
import useStyles from './Channels.styles'

export default function ScrollableTabsButtonForce() {
  const classes = useStyles()

  const [index, setIndex] = useState<number>(0)
  const { getAllChannels, getChannelMovies } = useMovieChannelsHelpers()
  const channels: string[] = getAllChannels()

  return channels?.length ? (
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
      <MoviesTable rows={getChannelMovies(channels[index]) ?? ([] as any)} />
    </>
  ) : (
    <p>No Channel Found.</p>
  )
}
