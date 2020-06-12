import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";

function ManageRestaurant(props) {
  const {
    handleSave,
    handleClose,
    selectedRow,
    classes,
    open,
    fieldValue,
    fieldChange
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {selectedRow === "" ? "Create restaurant" : "Edit restaurant"}
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText>Please input the restaurant name.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="text_field"
          label="Restaurant Name"
          type="text"
          className={classes.textField}
          fullWidth
          rows="5"
          variant="outlined"
          value={fieldValue}
          onChange={fieldChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManageRestaurant;
