import React, { VFC } from 'react'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete'

export interface TextInputProps extends AutocompleteRenderInputParams {
  isLoading: boolean
  isSubmittable: boolean
}

const TextInput: VFC<TextInputProps> = ({
  isLoading,
  isSubmittable,
  ...props
}) => {
  return (
    <TextField
      {...props}
      placeholder="Search Movie"
      variant="outlined"
      size="small"
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <>
            {props.InputProps.endAdornment}
            {isLoading && <CircularProgress color="info" size={20} />}
            {isSubmittable && (
              <InputAdornment position="end">
                <IconButton color="secondary" type="submit" size="small">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )}
          </>
        ),
      }}
    />
  )
}

export default TextInput