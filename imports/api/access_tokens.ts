import { Mongo } from 'meteor/mongo';

export class AccessToken {
  _id?: string;
  token: string;
  expiresAt: Date;
  userId: string;

  constructor(token:string, expiresAt:Date, userId:string) {
    this.token = token;
    this.expiresAt = expiresAt;
    this.userId = userId;
  }

  static generate(userId:string) {
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + 600000);
    const id = AccessTokensCollection.insert({
      userId: userId,
      token: "123",
      expiresAt: newDate
    });
    return AccessTokensCollection.findOne(id);
  }
}

export const AccessTokensCollection = new Mongo.Collection<AccessToken>('access_tokens', {
  transform: (doc:AccessToken) => new AccessToken(doc.token, doc.expiresAt, doc.userId)
});