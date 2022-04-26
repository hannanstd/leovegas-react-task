import React, { VFC } from 'react'
import { MoviesTableCellsProps } from '../../MoviesTable'

export interface DescriptionCellProps extends MoviesTableCellsProps {}
const DescriptionCell: VFC<DescriptionCellProps> = ({ row }) => {
  return (
    <div>
      <strong>Description: </strong>
      {row.overview}
    </div>
  )
}
export default DescriptionCell
