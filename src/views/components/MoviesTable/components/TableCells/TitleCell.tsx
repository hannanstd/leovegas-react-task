import { TableCellsProps } from '../../MoviesTable.types'
import React, { VFC } from 'react'

export interface TitleCellProps extends TableCellsProps {}
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
