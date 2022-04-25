import React, { VFC } from 'react'
import { CircularProgress } from '@mui/material'
import Stack from '@mui/material/Stack'

const Loading: VFC = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <CircularProgress />
    </Stack>
  )
}

export default Loading
