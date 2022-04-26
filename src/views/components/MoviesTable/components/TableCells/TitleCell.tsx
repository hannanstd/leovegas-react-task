import React, { VFC } from 'react'
import { MoviesTableCellsProps } from '../../MoviesTable'

export interface TitleCellProps extends MoviesTableCellsProps {}
const TitleCell: VFC<TitleCellProps> = ({ row }) => {
  return (
    <>
      {row.title} {row.year ? ` (${row.year})` : ''}
      <br />
      {row.language}
    </>
  )
}
export default TitleCell
