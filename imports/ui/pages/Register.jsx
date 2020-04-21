import * as React from 'react';
import { autorun } from 'meteor/cereal:reactive-render';
import {createStyles, withStyles} from "@material-ui/core";
import { withSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";
import { RegisterForm } from "../components/register/RegisterForm";
import {Link, withRouter} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Grid from "@material-ui/core/Grid";
import PaddedPaper from "meteor/cereal:ui/components/PaddedPaper";

export const authenticationStyles = theme => createStyles({
  container: {
    marginTop: "auto",
    marginBottom: "auto",
    color: theme.palette.type === "light" ? "#EDEDED" : theme.palette.text.primary
  }
});

@withStyles(authenticationStyles)
@withRouter
@withSnackbar
@autorun
class RegisterComponent extends React.Component {

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  createUser(values, form) {
    const { enqueueSnackbar } = this.props;
    if(values.email !== values.confirmEmail) {
      form.setSubmitting(false);
      enqueueSnackbar("Emails do not match!", { variant: "error" });
      return;
    }

    if(!values.termsAccept) {
      form.setSubmitting(false);
      enqueueSnackbar("You have to accept out terms and agreements before proceeding!", { variant: "error" });
      return;
    }

    Accounts.createUser({
      email: values.email,
      password: values.password
    }, err => {
      if(err) {
        form.setSubmitting(false);
        enqueueSnackbar(`Error while signing up: ${err.message}`, { variant: "error" });
        return;
      }
      enqueueSnackbar("Signed up!", { variant: "success" });
      Meteor.loginWithPassword(values.email, values.password);
      this.props.history.push("/");
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify={"center"}>
        <Grid item className={classes.container} xs={12} sm={12} md={6} lg={3}>
          <PaddedPaper>
            <Typography variant={"h2"}>Register</Typography>
            <Typography variant={"h6"} paragraph>Join the community!</Typography>
            <RegisterForm
              submitHandler={(values, form) => this.createUser(values, form)}
            />
            <Typography variant={"body1"}>
              Have an account already? <Link to={"/login"}>Log in</Link> instead!
            </Typography>
          </PaddedPaper>
        </Grid>
      </Grid>
    )
  }
}

export const Register = RegisterComponent;