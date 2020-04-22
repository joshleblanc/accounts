import * as React from 'react';
import {Field} from "formik";
import {TextField} from "formik-material-ui";
import {useSnackbar} from "notistack";
import StyledButton from 'meteor/cereal:ui/components/StyledButton';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return({
    copyButton: {
      marginRight: theme.spacing(1)
    }
  })
})

export const ClientSecretField = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const inputRef = React.useRef(null);
  const handleClick = React.useCallback((e) => {
    const target = inputRef.current;
    if(!target) return null;

    (target as HTMLInputElement).select();
    document.execCommand('copy');
    e.target.focus();
    enqueueSnackbar("Client secret copied!", { variant: "info" });
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
        inputRef={inputRef}
      />
      <StyledButton
        loading={false}
        onClick={handleClick}
        variant={"contained"}
        color={"primary"}
        className={classes.copyButton}
      >
        Copy
      </StyledButton>
      <StyledButton loading={false} variant={"contained"} color={"primary"}>Regenerate</StyledButton>
    </>
  )
}