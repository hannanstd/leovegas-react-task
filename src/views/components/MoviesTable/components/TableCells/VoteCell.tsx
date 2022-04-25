import { TableCellsProps } from '../../MoviesTable.types'
import React, { VFC } from 'react'
import Rating from '@mui/material/Rating'

export interface VoteCellProps extends TableCellsProps {}
const VoteCell: VFC<VoteCellProps> = ({ row }) => {
  return (
    <>
      <strong>{row.voteAverage}</strong>/10 from {row.voteCount} votes
      <br />
      <Rating value={row.voteAverage} readOnly size="small" max={10} />
      <br />
      <br />
      Popularity: {row.popularity}
    </>
  )
}
export default VoteCell
