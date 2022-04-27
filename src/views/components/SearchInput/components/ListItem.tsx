import React, { VFC } from 'react'
import { MovieObjectType } from 'types/Movies.types'

export type ListItemProps = Pick<
  MovieObjectType,
  'thumbnail' | 'title' | 'year'
> & { attributes: React.HTMLAttributes<HTMLLIElement> }

const ListItem: VFC<ListItemProps> = ({
  thumbnail,
  title,
  year,
  attributes,
}) => {
  return (
    <li {...attributes} data-testid="list-item">
      {thumbnail && (
        <img src={thumbnail} alt="" width={50} style={{ marginRight: 15 }} />
      )}
      {title} <br />
      {year || null}
    </li>
  )
}

export default ListItem
