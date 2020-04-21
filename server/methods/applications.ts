import { Meteor } from 'meteor/meteor';
import {ApplicationService} from "../../imports/services/ApplicationService";

const applicationService = new ApplicationService();

Meteor.methods({
  'applications.create'(name) {
    if(!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    const user = Meteor.users.findOne({ _id: this.userId });
    if(user) {
      return applicationService.create(name, this.userId);
    }
  }
})