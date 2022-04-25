import React, { VFC } from 'react'
import { TableCellsProps } from '../../MoviesTable.types'

export interface DescriptionCellProps extends TableCellsProps {}
const DescriptionCell: VFC<DescriptionCellProps> = ({ row }) => {
  return (
    <div>
      <strong>Description: </strong>
      {row.overview}
    </div>
  )
}
export default DescriptionCell
