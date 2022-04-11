import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

export default function SelectedGroup({payload, setPayload, disabled}) {

  const handleDelete = (id) => {
    const myGroups = payload?.groups?.groups?.filter((group) => group.id !== id) ?? [];
    setPayload({
      ...payload,
      groups: {
        ...payload?.groups,
        groups: myGroups
      }
    });
  }

  return (
    <>
      {
        payload?.groups?.groups?.map(group =>
          <ListItem
            key={group.id}
            secondaryAction={
              <IconButton
                disabled={disabled}
                onClick={() => handleDelete(group.id)}
                edge="end"
                aria-label="delete">
                <DeleteIcon/>
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={group.name}
              secondary={group.groupId}
            />
          </ListItem>
        )
      }
    </>
  )
}