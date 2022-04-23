import React, { useEffect, useState, VFC } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchParams } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete'
import Paper from '@mui/material/Paper'
import ListItemButton from '@mui/material/ListItemButton'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { useDebounce, useQuery } from 'hooks'
import useStyles from './SearchInput.styles'

export interface SearchInputProps {}
const queryKey: string = 'q'

const SearchInput: VFC<SearchInputProps> = () => {
  const classes = useStyles()
  const [queryParams, setQueryParams] = useSearchParams()

  const queryValue: string = queryParams.get(queryKey) as string
  const [inputValue, setInputValue] = useState<string>(queryValue)
  const debouncedInputValue: string = useDebounce(inputValue, 500)

  const isSubmittable: boolean = !!inputValue && inputValue !== queryValue

  useEffect(() => setInputValue(queryValue), [queryValue])

  const { isLoading, data } = useQuery(
    ['searchMovie', debouncedInputValue, 1],
    {
      variables: { searchText: debouncedInputValue, page: 1 },
      options: { enabled: !!debouncedInputValue },
    }
  )

  const setSearchQuery = (value: string = inputValue): void => {
    setQueryParams({ [queryKey]: value.trim() })
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSearchQuery()
  }

  return (
    <form onSubmit={onFormSubmit} className={classes.root}>
      <Autocomplete
        key={queryValue}
        loading={isLoading}
        noOptionsText={!inputValue ? 'Search for a movie' : 'No movies found'}
        options={data?.items || []}
        isOptionEqualToValue={(option) => option?.title === inputValue}
        getOptionLabel={(option) => option?.title}
        renderOption={(props, { id, thumbnail, title, year }) => (
          <li {...props} key={id}>
            {thumbnail && (
              <img src={thumbnail} alt="" className={classes.thumbnail} />
            )}
            {title} <br />
            {year || null}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Movie"
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
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
        )}
        PaperComponent={({ children, ...props }) => (
          <Paper {...props} className={classes.paperRoot}>
            {children}
            {isSubmittable && (
              <ListItemButton
                className={classes.viewAll}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setSearchQuery()}
              >
                See all results for "{inputValue}"
              </ListItemButton>
            )}
          </Paper>
        )}
        classes={{
          root: classes.autoCompleteRoot,
          inputRoot: classes.inputRoot,
          input: classes.input,
        }}
        inputValue={inputValue || ''}
        onInputChange={(event, newInputValue) => {
          if (event?.type === 'change') setInputValue(newInputValue)
        }}
        onChange={(event, selectedOption) => {
          if (selectedOption?.title)
            setSearchQuery(selectedOption?.title as string)
        }}
      />
    </form>
  )
}

export default SearchInput
