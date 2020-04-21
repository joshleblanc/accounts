import {Meteor} from 'meteor/meteor';

export class UserService {
  currentUser() {
    const userId = Meteor.userId();
    if(!userId) return null;

    return Meteor.users.find({
      _id: userId
    }, {
      fields: {
        isAdmin: 1
      }
    })
  }

  findById(id: string) {
    return Meteor.users.find({ _id: id });
  }
}