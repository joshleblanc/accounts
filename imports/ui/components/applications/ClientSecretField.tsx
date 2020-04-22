import * as React from 'react';
import {Field} from "formik";
import {TextField} from "formik-material-ui";
import MuiTextField from '@material-ui/core/TextField'
import {useSnackbar} from "notistack";
import StyledButton from 'meteor/cereal:ui/components/StyledButton';
import {makeStyles} from "@material-ui/core/styles";
import {RegenerateClientSecretButton} from "./RegenerateClientSecretButton";

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
  const [fieldVisible, setFieldVisible] = React.useState(false);
  const inputRef = React.useRef(null);
  const handleClick = React.useCallback((e) => {
    const target = inputRef.current;
    if(!target) return null;

    (target as HTMLInputElement).select();
    document.execCommand('copy');
    e.target.focus();
    enqueueSnackbar("Client secret copied!", { variant: "info" });
  }, []);
  const showField = React.useCallback(() => {
    setFieldVisible(true);
  }, [setFieldVisible]);
  return(
    <>
      {
        fieldVisible ? <Field
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
        /> : <MuiTextField
          value={"Click to reveal"}
          label={"Client Secret"}
          fullWidth
          InputProps={{
            readOnly: true
          }}
          onClick={showField}
          margin={"normal"}
          variant={"outlined"}
        />
      }
      <StyledButton
        loading={false}
        onClick={handleClick}
        variant={"contained"}
        color={"primary"}
        className={classes.copyButton}
      >
        Copy
      </StyledButton>
      <RegenerateClientSecretButton />
    </>
  )
}