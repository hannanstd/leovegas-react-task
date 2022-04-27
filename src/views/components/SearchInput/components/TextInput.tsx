import React, { VFC } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import LeftSideIcon from '@mui/icons-material/MovieFilter'
import TextField from '@mui/material/TextField'
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'

export interface TextInputProps extends AutocompleteRenderInputParams {
  isLoading: boolean
  isSubmittable: boolean
  placeholder?: string
}

const TextInput: VFC<TextInputProps> = ({
  isLoading,
  isSubmittable,
  placeholder = 'Search Movie',
  ...props
}) => {
  return (
    <TextField
      {...props}
      placeholder={placeholder}
      autoFocus
      data-testid="search-input"
      variant="outlined"
      size="small"
      InputProps={{
        ...props.InputProps,
        startAdornment: (
          <>
            {props.InputProps.startAdornment}
            <LeftSideIcon color="secondary" />
          </>
        ),
        endAdornment: (
          <>
            {props.InputProps.endAdornment}
            {isLoading && <CircularProgress color="info" size={12} />}
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
