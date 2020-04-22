import * as React from 'react';
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {AdminDrawerItems} from "./components/drawer_items/AdminDrawerItems";
import {Link} from "react-router-dom";

export const DrawerItems = () => {
  return(
    <List>
      <ListItem button component={Link} to={"/profile"}>
        <ListItemText primary={"Profile"} />
      </ListItem>
      <Divider />
      <AdminDrawerItems />
    </List>
  )
}