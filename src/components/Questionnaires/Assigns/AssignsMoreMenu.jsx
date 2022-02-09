import React from 'react';
import { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

const AssignsMoreMenu = () => {

    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    return ( 

        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                sx: { width: 200, maxWidth: '100%' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>

                <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>
            </Menu>
    </>

     );
}
 
export default AssignsMoreMenu;