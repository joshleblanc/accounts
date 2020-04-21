import * as React from 'react';
import Layout from 'meteor/cereal:ui/components/Layout';
import {Routes} from "/imports/ui/Routes";
import {DrawerItems} from "/imports/ui/DrawerItems";
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
