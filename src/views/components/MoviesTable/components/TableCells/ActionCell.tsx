import {
  MovieIdType,
  MovieObjectType,
  TableCellsProps,
} from '../../MoviesTable.types'
import React, { VFC } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import EditIcon from '@mui/icons-material/Edit'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export interface ActionCellProps extends TableCellsProps {
  isCollapsed: boolean
  onCollapseChange: (id: MovieIdType, collapsed: boolean) => void
  onChannelClick: (row: MovieObjectType) => void
  isInChannel: boolean
  isEditChannel: boolean
}
const ActionCell: VFC<ActionCellProps> = ({
  row,
  isCollapsed,
  onCollapseChange,
  onChannelClick,
  isInChannel,
  isEditChannel,
}) => {
  return (
    <ButtonGroup>
      <Checkbox
        title="Add Movie to your list"
        checked={isInChannel}
        indeterminate={isEditChannel}
        onChange={() => onChannelClick(row)}
        icon={<BookmarkBorderIcon />}
        indeterminateIcon={<EditIcon color="disabled" />}
        checkedIcon={<BookmarkAddedIcon color="success" />}
      />

      <Checkbox
        title="View Description"
        checked={isCollapsed}
        onChange={(e, checked) => onCollapseChange(row.id, checked)}
        icon={<ArrowDownIcon />}
        checkedIcon={<ArrowUpIcon />}
      />
    </ButtonGroup>
  )
}
export default ActionCell
