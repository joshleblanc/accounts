import * as React from 'react';
import {LoginForm} from "/imports/ui/components/login/LoginForm";
import { Meteor } from 'meteor/meteor';
import {useTracker} from "meteor/react-meteor-data";
import StyledButton from 'meteor/cereal:ui/components/StyledButton';
import * as queryString from "query-string";
import {useSnackbar} from "notistack";

function authorize() {
  Meteor.call('authorize', (err, res) => {
    const parsed = queryString.parse(location.search);
    window.location.assign(`${parsed.redirectUrl}?accessToken=${res.token}`);
  });
}

export const Authorize = () => {
  const user = useTracker(() => {
    return Meteor.user();
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleAuthorizeClick = React.useCallback(() => {
    authorize();
  }, []);

  const handleLogin = React.useCallback((values, form) => {
    Meteor.loginWithPassword(values.email, values.password, err => {
      if(err) {
        form.setSubmitting(false);
        enqueueSnackbar(`Failed to login: ${err.message}`, { variant: "error" });
        return;
      }
      enqueueSnackbar("Logged in successfully!");
      authorize();
    });
  }, []);
  if(user) {
    return(
      <StyledButton onClick={handleAuthorizeClick}>Authorize</StyledButton>
    )
  }
  return <LoginForm submitHandler={handleLogin}/>
}