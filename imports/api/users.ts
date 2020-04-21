import { Meteor } from 'meteor/meteor';

export type User = {
  isAdmin?: boolean
} & Meteor.User