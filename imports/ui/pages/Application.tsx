import PaddedPaper from "meteor/cereal:ui/components/PaddedPaper"
import * as React from "react";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import { useParams } from "react-router-dom";

export const Application = () => {
  const {id} = useParams();
  Meteor.subscribe('application', id);
  const handleSubmit = React.useCallback(() => {

  }, []);
  console.log(params);
  return(
    <PaddedPaper>
      <Formik onSubmit={handleSubmit}>
        <Form>
          <Field
            label={"Name"}
            component={TextField}
          />
        </Form>
      </Formik>
    </PaddedPaper>
  )
}