import { Field, Form, Formik } from "formik";
import StyledButton from "meteor/cereal:ui/components/StyledButton";
import { TextField } from "formik-material-ui";
import React from "react";
import yup from 'yup';

const UserSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required(),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  desc: yup.string().notRequired(),
  username: yup.string().notRequired()
});

export const LoginForm = ({ submitHandler, className }) => {
  return (
    <section className={className}>
      <Formik
        validationSchema={UserSchema}
        initialValues={{
          email: "",
          password: ""
        }}
        validateOnMount={true}
        onSubmit={submitHandler}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <div>
              <Field
                name={"email"}
                label={"Email"}
                variant="outlined"
                fullWidth
                component={TextField}
                margin={"normal"}
              />
              <Field
                name={"password"}
                label={"Password"}
                variant="outlined"
                fullWidth
                component={TextField}
                type={"password"}
                margin={"normal"}
              />
              <StyledButton
                color={"primary"}
                variant={"contained"}
                type="submit"
                loading={isSubmitting}
                disabled={!isValid}
              >
                Login
              </StyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}