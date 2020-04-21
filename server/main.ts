import { Meteor } from 'meteor/meteor';
import {AccessToken} from "/imports/api/access_tokens";
import {WebApp} from "meteor/webapp";
import express from 'express';
import "./publications/users";
import "./methods/applications";

const app = express();

app.post('/oauth/token', (req, res, next) => {
  res.send("okay");
  next();
});

WebApp.connectHandlers.use(app)

Meteor.methods({
  authorize() {
    if(this.userId) {
      return AccessToken.generate(this.userId);
    } else {
      throw new Meteor.Error("Not Authorized");
    }

  }
})