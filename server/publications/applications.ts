import { Meteor } from "meteor/meteor";
import {ApplicationService} from "../../imports/services/ApplicationService";

const applicationService = new ApplicationService();

Meteor.publish('application', function(id: string)  {
  const userId = this.userId;
  if(!userId) return this.ready();
  const cursor = applicationService.findById(id)
  const application = cursor.fetch()[0];
  if(application && application.creatorId === userId) {
    return cursor;
  } else {
    return this.ready();
  }
});