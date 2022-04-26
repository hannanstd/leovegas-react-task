import React, { VFC } from 'react'
import { MovieIdType } from 'types/Movies.types'
import { MoviesTableCellsProps } from '../../MoviesTable'

export interface ThumbnailCellProps extends MoviesTableCellsProps {
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
