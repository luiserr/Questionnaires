import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

export default function SelectedUsers({payload, setPayload, disabled}) {

  const handleDelete = (id) => {
    const myUsers = payload?.users?.filter((user) => user.id !== id) ?? [];
    setPayload({
      ...payload,
      users: myUsers
    });
  }

  return (
    <>
      {
        payload?.users?.map(user =>
          <ListItem
            key={user.id}
            secondaryAction={
              <IconButton
                disabled={disabled}
                onClick={() => handleDelete(user.id)}
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
              primary={user.name}
              secondary={user.email}
            />
          </ListItem>
        )
      }
    </>
  )
}