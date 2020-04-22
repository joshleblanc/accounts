import * as React from 'react';
import {Field} from "formik";
import {TextField} from "formik-material-ui";
import StyledButton from 'meteor/cereal:ui/components/StyledButton';
import {useSnackbar} from "notistack";

export const ClientIdField = () => {
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
        name={"clientId"}
        label={"Client ID"}
        component={TextField}
        fullWidth
        InputProps={{
          readOnly: true
        }}
        variant={"outlined"}
        margin={"normal"}
        inputRef={inputRef}
      />
      <StyledButton
        loading={false}
        onClick={handleClick}
        variant={"contained"}
        color={"primary"}
      >Copy</StyledButton>
    </>
  )
}