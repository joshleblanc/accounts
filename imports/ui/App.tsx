import * as React from 'react';
import Layout from 'meteor/cereal:ui/components/Layout';
import {Routes} from "./Routes";
import {DrawerItems} from "./DrawerItems";
import { Meteor } from 'meteor/meteor';

export const App = () => {
  Meteor.subscribe('current_user');
  return (
    <Layout
      Routes={Routes}
      DrawerItems={DrawerItems}
    />
  )
};
