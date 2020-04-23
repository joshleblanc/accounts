import * as React from 'react';
import {useTracker} from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';
import PaddedPaper from 'meteor/cereal:ui/components/PaddedPaper';
import StyledButton from 'meteor/cereal:ui/components/StyledButton';

export const Profile = () => {
  const user = useTracker(() => Meteor.user());
  console.log(user);
  const handleClick = React.useCallback(() => {
    Meteor.linkWithDiscord({
      requestPermissions: ['identify', 'email', 'connections', 'guilds']
    });
  }, []);
  return(
    <PaddedPaper>
      <StyledButton
        variant={"contained"}
        color={"primary"}
        onClick={handleClick}
      >
        Link discord account
      </StyledButton>
    </PaddedPaper>
  )
}