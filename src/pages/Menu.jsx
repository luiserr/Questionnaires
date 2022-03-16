import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import menus from '../const/menu';

export default function Menu() {

  const navigate = useNavigate();

  return (
    <List>
      {menus.map((menu, index) => (
        <ListItem
          // button
          key={index}
          // compoment={AdapterLink}
          // to={menu.route}
        >
          <ListItemIcon
            sx={{cursor: 'pointer'}}
            alt={menu.label}
            title={menu.label}
            onClick={()=>navigate(menu.route)}
          >
            {menu.icon}
          </ListItemIcon>
          <Link to={menu.route}>
            <ListItemText primary={menu.label}/>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}