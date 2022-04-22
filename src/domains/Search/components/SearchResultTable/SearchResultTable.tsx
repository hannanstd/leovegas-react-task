import React, { VFC } from 'react'
import useStyles from './SearchResultTable.styles'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

const rows: GridRowsProp = [
  { id: 1, col1: 'Row1-Col1', col2: 'Row1-Col2' },
  { id: 2, col1: 'Row2-Col1', col2: 'Row2-Col2' },
  { id: 3, col1: 'Row3-Col1', col2: 'Row3-Col2' },
  { id: 4, col1: 'Row4-Col1', col2: 'Row4-Col2' },
]

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
]

export interface SearchResultTableProps {}
const SearchResultTable: VFC<SearchResultTableProps> = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  )
}

export default SearchResultTable
