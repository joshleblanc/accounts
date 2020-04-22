import * as React from 'react';
import {Meteor} from 'meteor/meteor';
import {Divider, Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {CreateApplication} from "../components/applications/CreateApplication";
import {ApplicationService} from "../../services/ApplicationService";
import {useTracker} from "meteor/react-meteor-data";
import {Link} from "react-router-dom";
import PaddedPaper from 'meteor/cereal:ui/components/PaddedPaper';

const applicationService = new ApplicationService();

export const Applications = () => {
  const userId = Meteor.userId();
  if(!userId) return null;
  Meteor.subscribe('user.applications');
  const applications = useTracker(() => applicationService.findByCreator(userId).fetch());
  console.log(applications, userId);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PaddedPaper>
          <Typography variant={"h2"}>Applications</Typography>
          <CreateApplication />
        </PaddedPaper>
      </Grid>
      <Grid item xs={12}>
        <PaddedPaper>
          <List>
            {
              applications.map(application => {
                return (
                  <div key={application._id}>
                    <ListItem button component={Link} to={`/applications/${application._id}`}>
                      <ListItemText primary={application.name}/>
                    </ListItem>
                    <Divider />
                  </div>
                )
              })
            }
          </List>
        </PaddedPaper>
      </Grid>
    </Grid>
  )
}