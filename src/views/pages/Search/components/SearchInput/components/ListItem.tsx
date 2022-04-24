import React, { VFC } from 'react'
import { QuerySchemas } from 'schema/query.schema'

export type ListItemProps = Pick<
  QuerySchemas['searchMovie']['output']['items'][0],
  'thumbnail' | 'title' | 'year'
> & { attributes: React.HTMLAttributes<HTMLLIElement> }

const ListItem: VFC<ListItemProps> = ({
  thumbnail,
  title,
  year,
  attributes,
}) => {
  return (
    <li {...attributes}>
      {thumbnail && (
        <img src={thumbnail} alt="" width={50} style={{ marginRight: 15 }} />
      )}
      {title} <br />
      {year || null}
    </li>
  )
}

export default ListItem
