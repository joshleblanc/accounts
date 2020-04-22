import * as React from 'react';
import StyledButton from "meteor/cereal:ui/components/StyledButton";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import { Meteor } from 'meteor/meteor';

export const CreateApplication = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const openDialog = React.useCallback(() => {
    setDialogOpen(prevState => !prevState);
  }, [])
  const closeDialog = React.useCallback(() => setDialogOpen(false), []);
  const handleSubmit = React.useCallback(() => {
    Meteor.call('applications.create', name)
    closeDialog();
  }, [name]);
  const handleNameChange = React.useCallback(e => {
    setName(e.target.value);
  }, []);
  return(
    <>
      <StyledButton variant={"contained"} color={"primary"} onClick={openDialog}>Create Application</StyledButton>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Create an application</DialogTitle>
        <DialogContent>
          <DialogContentText>owuefhwef</DialogContentText>
          <TextField
            autoFocus
            margin={"dense"}
            label={"Name"}
            value={name}
            onChange={handleNameChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={closeDialog} color="primary">
            Cancel
          </StyledButton>
          <StyledButton onClick={handleSubmit} color="primary" variant={"contained"}>
            Create
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  )
}