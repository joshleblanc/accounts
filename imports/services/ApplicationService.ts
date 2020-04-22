import {ApplicationsCollection} from "../api/applications";
import { Mongo } from 'meteor/mongo';

export class ApplicationService {
  create(name: string, creatorId: string) {
    const clientId = new Mongo.ObjectID().toHexString();
    const clientSecret = new Mongo.ObjectID().toHexString();
    return ApplicationsCollection.insert({
      name,
      creatorId,
      clientId,
      clientSecret
    })
  }

  findByCreator(creatorId: string) {
    return ApplicationsCollection.find({
      creatorId
    });
  }

  findById(id: string) {
    return ApplicationsCollection.find({ _id: id });
  }

  update(id: string, name: string) {
    return ApplicationsCollection.update({
      _id: id
    }, {
      $set: {
        name
      }
    });
  }

  regenerateClientSecret(id: string) {
    return ApplicationsCollection.update({
      _id: id
    }, {
      $set: {
        clientSecret: new Mongo.ObjectID().toHexString()
      }
    })
  }
}