import { Meteor } from 'meteor/meteor';
import {UserService} from "../../imports/services/UserService";
import {ApplicationService} from "../../imports/services/ApplicationService";

const userService = new UserService();
const applicationService = new ApplicationService();

Meteor.publish('current_user', function() {
  const userId = Meteor.userId();
  if(userId) {
    return userService.currentUser();
  } else {
    this.ready();
  }
});

Meteor.publish('user.applications', function() {
  const id = Meteor.userId();
  if(!id) return this.ready();
  return applicationService.findByCreator(id);
});