import PaddedPaper from "meteor/cereal:ui/components/PaddedPaper"
import * as React from "react";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import { useParams } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import {useTracker} from "meteor/react-meteor-data";
import {ApplicationService} from "../../services/ApplicationService";
import {useSnackbar} from "notistack";
import StyledButton from "meteor/cereal:ui/components/StyledButton";
import {Grid} from "@material-ui/core";
import {ClientIdField} from "../components/applications/ClientIdField";
import {ClientSecretField} from "../components/applications/ClientSecretField";
import { AutoSave } from 'meteor/cereal:ui/components/AutoSave';

const applicationService = new ApplicationService();

export const Application = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {id} = useParams();
  Meteor.subscribe('application', id);
  const application = useTracker(() => {
    if(id) {
      return applicationService.findById(id).fetch()[0]
    }
  });
  console.log(application?.clientSecret);
  const handleSubmit = React.useCallback((values) => {
    Meteor.call('applications.update', id, values.name, (err?: Meteor.Error) => {
      if(err) {
        enqueueSnackbar("Error updating application", { variant: "error" });
      } else {
        enqueueSnackbar("Application updated", { variant: "success"});
      }
    })
  }, [id]);
  if(!id || !application) return null;

  return(
    <PaddedPaper>
      <Formik onSubmit={handleSubmit} initialValues={application} enableReinitialize>
        {
          ({isSubmitting, values}) => {
            return (
              <Form>
                <Field
                  name={"name"}
                  label={"Name"}
                  component={TextField}
                  fullWidth
                  margin={"normal"}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <ClientIdField/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ClientSecretField/>
                  </Grid>
                </Grid>
                <StyledButton
                  type={"submit"}
                  loading={isSubmitting}
                  variant={"contained"}
                  color={"primary"}
                >
                  Submit
                </StyledButton>
                <AutoSave debounce={1000} onSave={handleSubmit} values={values} />
              </Form>
            )
          }
        }
      </Formik>
    </PaddedPaper>
  )
}