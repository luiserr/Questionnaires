import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import {Link} from "react-router-dom";
import menus from '../const/menu';

export default function Menu() {
  return (
    <List>
      {menus.map((menu, index) => (
        <ListItem
          // button
          key={index}
          // compoment={AdapterLink}
          // to={menu.route}
        >
          <ListItemIcon>
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