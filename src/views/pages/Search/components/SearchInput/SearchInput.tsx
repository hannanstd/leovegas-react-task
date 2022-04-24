import React, { FormEvent, useEffect, useState, VFC } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Paper from '@mui/material/Paper'
import { useDebounce, useQuery } from 'hooks'
import useStyles from './SearchInput.styles'
import useSearchedValue from '../../hooks'
import ListItem from './components/ListItem'
import TextInput from './components/TextInput'
import ViewResultLink from './components/ViewResultLink'

const SearchInput: VFC = () => {
  const classes = useStyles()
  const [submittedValue, submitValue] = useSearchedValue()

  const [inputValue, setInputValue] = useState<string>(submittedValue)
  useEffect(() => setInputValue(submittedValue), [submittedValue])

  const debouncedInputValue: string = useDebounce(inputValue, 500)
  const { isLoading, data } = useQuery('searchMovie', {
    variables: { searchText: debouncedInputValue, page: 1 },
    options: { enabled: !!debouncedInputValue },
  })

  const isSubmittable: boolean = !!inputValue && inputValue !== submittedValue

  return (
    <div className={classes.root}>
      <form
        className={classes.formRoot}
        onSubmit={(e: FormEvent<HTMLFormElement>): void => {
          e.preventDefault()
          submitValue(inputValue)
        }}
      >
        <Autocomplete
          key={submittedValue}
          options={data?.items || []}
          isOptionEqualToValue={(option) => option?.title === inputValue}
          getOptionLabel={(option) => option?.title}
          inputValue={inputValue || ''}
          onInputChange={(event, newInputValue) => {
            if (event?.type === 'change') setInputValue(newInputValue)
          }}
          onChange={(event, selectedOption) => {
            if (selectedOption?.title) submitValue(selectedOption?.title)
          }}
          classes={{
            root: classes.autoCompleteRoot,
            inputRoot: classes.inputRoot,
            input: classes.input,
          }}
          loading={isLoading}
          noOptionsText={!inputValue ? 'Search for a movie' : 'No movies found'}
          renderOption={(attributes, item) => (
            <ListItem attributes={attributes} {...item} key={item.id} />
          )}
          renderInput={(props) => (
            <TextInput
              isLoading={isLoading}
              isSubmittable={isSubmittable}
              {...props}
            />
          )}
          PaperComponent={({ children, ...props }) => (
            <Paper {...props} className={classes.paperRoot}>
              {children}
              {isSubmittable && (
                <ViewResultLink value={inputValue} onClick={submitValue} />
              )}
            </Paper>
          )}
        />
      </form>
    </div>
  )
}

export default SearchInput
