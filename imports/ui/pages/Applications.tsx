import * as React from 'react';
import {Meteor} from 'meteor/meteor';
import {List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {CreateApplication} from "../components/applications/CreateApplication";
import {ApplicationService} from "../../services/ApplicationService";
import {useTracker} from "meteor/react-meteor-data";
import {Link} from "react-router-dom";

const applicationService = new ApplicationService();

export const Applications = () => {
  const userId = Meteor.userId();
  if(!userId) return null;
  Meteor.subscribe('user.applications');
  const applications = useTracker(() => applicationService.findByCreator(userId).fetch());
  console.log(applications, userId);
  return (
    <>
      <Typography variant={"h1"}>Applications</Typography>
      <CreateApplication />
      <List>
        {
          applications.map(application => {
            return (
              <ListItem button key={application._id} component={Link} to={`/applications/${application._id}`}>
                <ListItemText primary={application.name}/>
              </ListItem>
            )
          })
        }
      </List>
    </>
  )
}