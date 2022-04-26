import React, { FormEvent, useState, VFC } from 'react'
import TextField from '@mui/material/TextField'
import useStyles from './AddNewChannel.styles'
import Button from '@mui/material/Button'

export interface AddChannelProps {
  onSubmit: (channelName: string) => void
}

const AddChannel: VFC<AddChannelProps> = ({ ...props }) => {
  const classes = useStyles()

  const [channelName, setChannelName] = useState<string>('')
  const disabled: boolean = !channelName

  const onSubmit = (e?: FormEvent<HTMLFormElement>): void => {
    e?.preventDefault()
    if (disabled) return
    props.onSubmit(channelName)
    setChannelName('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={classes.root}>
        <TextField
          size="small"
          label="Add New Channel"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />

        <Button
          color="secondary"
          size="large"
          title="Add New Channel"
          disabled={disabled}
          type="submit"
        >
          Add
        </Button>
      </div>
    </form>
  )
}

export default AddChannel
