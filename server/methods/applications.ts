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
  },
  'applications.update'(id: string, name: string) {
    const application = applicationService.findById(id).fetch()[0];
    const userId = this.userId;
    if(!userId) {
      throw new Meteor.Error("Not authorized");
    }
    if(!application) {
      throw new Meteor.Error("Application not found");
    }
    if(application.creatorId !== userId) {
      throw new Meteor.Error("Not authorized");
    }

    return applicationService.update(id, name);
  },
  'applications.regenerateClientSecret'(id: string) {
    const application = applicationService.findById(id).fetch()[0];
    const userId = this.userId;
    if(!userId || !application || application.creatorId !== userId) {
      throw new Meteor.Error("Not authorized");
    }
    return applicationService.regenerateClientSecret(id);
  }
})