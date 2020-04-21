import { Mongo } from 'meteor/mongo';

interface Application {
  _id?: string;
  name: string
  clientId: string
  clientSecret: string
  creatorId: string
}

export const ApplicationsCollection = new Mongo.Collection<Application>('applications')