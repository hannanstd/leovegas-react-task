import React, { useState } from 'react'
import Fab from '@mui/material/Fab'
import FabIcon from '@mui/icons-material/FactCheckOutlined'
import { MovieChannelsModal } from 'views/components/MovieChannels'
import ChannelTabTables from './components/ChannelTabTables'
import useStyles from './Channels.styles'

export default function ScrollableTabsButtonForce() {
  const classes = useStyles()
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <ChannelTabTables />
      <Fab
        color="default"
        classes={{ root: classes.fabRoot }}
        onClick={() => setOpenModal((openModal) => !openModal)}
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
