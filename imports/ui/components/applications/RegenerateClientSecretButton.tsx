import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import StyledButton from 'meteor/cereal:ui/components/StyledButton';
import { useParams } from 'react-router-dom';
import {useSnackbar} from "notistack";

export const RegenerateClientSecretButton = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  console.log(id);
  const handleClick = React.useCallback(() => {
    Meteor.call('applications.regenerateClientSecret', id, (err: Meteor.Error) => {
      if(err) {
        enqueueSnackbar("There was a problem regenerating the client secret", { variant: "error" });
      } else {
        enqueueSnackbar("Client secret regenerated!", { variant: "success" });
      }
    })
  }, [id]);
  return(
    <StyledButton
      loading={false}
      variant={"contained"}
      color={"primary"}
      onClick={handleClick}
    >
      Regenerate
    </StyledButton>
  )
}