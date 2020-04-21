import * as React from 'react';
import {List} from "@material-ui/core";
import {AdminDrawerItems} from "/imports/ui/components/drawer_items/AdminDrawerItems";

export const DrawerItems = () => {
  return(
    <List>
      <AdminDrawerItems />
    </List>
  )
}