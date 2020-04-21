import * as React from 'react';
import {ListItem, ListItemText} from "@material-ui/core";
import { useUser } from 'meteor/cereal:ui/hooks/useUser';
import { Link } from 'react-router-dom';
import {User} from "../../../api/users";

export const AdminDrawerItems = () => {
  const user = useUser() as User | null;
  if(!user || !user.isAdmin) return null;

  return(
    <ListItem button component={Link} to={"/applications"}>
      <ListItemText primary={"Applications"} />
    </ListItem>
  )
};