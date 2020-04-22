import * as React from 'react';
import {Field} from "formik";
import {TextField} from "formik-material-ui";
import {useSnackbar} from "notistack";
import StyledButton from 'meteor/cereal:ui/components/StyledButton';
import {FormGroup} from "@material-ui/core";

export const ClientSecretField = () => {
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = React.useRef(null);
  const handleClick = React.useCallback((e) => {
    const target = inputRef.current;
    if(!target) return null;

    (target as HTMLInputElement).select();
    document.execCommand('copy');
    e.target.focus();
    enqueueSnackbar("Client ID copied!", { variant: "info" });
  }, []);
  return(
    <>
      <Field
        name={"clientSecret"}
        label={"Client Secret"}
        component={TextField}
        fullWidth
        InputProps={{
          readOnly:true
        }}
        variant={"outlined"}
        margin={"normal"}
      />
      <FormGroup row>
        <StyledButton
          loading={false}
          onClick={handleClick}
          variant={"contained"}
          color={"primary"}
        >
          Copy
        </StyledButton>
        <StyledButton loading={false} variant={"contained"} color={"primary"}>Regenerate</StyledButton>
      </FormGroup>

    </>
  )
}