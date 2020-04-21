import * as React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { autorun } from 'meteor/cereal:reactive-render';
import { authenticationStyles } from './Register';
import { LoginForm } from '../components/login/LoginForm';
import { Meteor } from 'meteor/meteor';
import {Link, withRouter} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import PaddedPaper from "meteor/cereal:ui/components/PaddedPaper";

@withStyles(authenticationStyles)
@withSnackbar
@withRouter
@autorun
class LoginComponent extends React.Component {
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  loginUser(values, form) {
    const { enqueueSnackbar } = this.props;

    Meteor.loginWithPassword(values.email, values.password, err => {
      if(err) {
        form.setSubmitting(false);
        enqueueSnackbar(`Failed to login: ${err.message}`, { variant: "error" });
        return;
      }
      enqueueSnackbar("Logged in successfully!");
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} justify={"center"}>
        <Grid item className={classes.container}>
          <PaddedPaper>
            <Typography variant={"h2"}>Log In</Typography>
            <Typography variant={"h6"} paragraph>To your account!</Typography>
            <LoginForm submitHandler={(values, form) => this.loginUser(values, form)} />
            <Typography variant={"body1"}>
              Don't have an account yet? <Link to={"/register"}>Create one</Link> now!
            </Typography>
          </PaddedPaper>
        </Grid>
      </Grid>
    )
  }
}

export const Login = LoginComponent;