import React, { VFC } from 'react'
import { CircularProgress } from '@mui/material'
import Stack from '@mui/material/Stack'

export interface LoadingProps {}

const Loading: VFC<LoadingProps> = () => {
  return (
    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
      <CircularProgress />
    </Stack>
  )
}

export default Loading
