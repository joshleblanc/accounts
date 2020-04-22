import * as React from 'react';
import {useTracker} from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';
import PaddedPaper from 'meteor/cereal:ui/components/PaddedPaper';
import StyledButton from 'meteor/cereal:ui/components/StyledButton';

export const Profile = () => {
  const user = useTracker(() => Meteor.user());
  console.log(user);
  const discordUrl = "https://discordapp.com/api/oauth2/authorize?client_id=702662755555082321&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F_oauth%2Fdiscord&response_type=code&scope=identify%20email%20connections%20guilds";
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