import { MovieIdType, TableCellsProps } from '../../MoviesTable.types'
import React, { VFC } from 'react'

export interface ThumbnailCellProps extends TableCellsProps {
  onClick: (id: MovieIdType) => void
}
const ThumbnailCell: VFC<ThumbnailCellProps> = ({ onClick, row }) => {
  return (
    <>
      {!!row.thumbnail && (
        <img
          onClick={() => onClick(row.id)}
          src={row.thumbnail}
          alt={row.title}
        />
      )}
    </>
  )
}
export default ThumbnailCell
