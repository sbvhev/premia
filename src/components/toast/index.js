import React from "react";
import { connect } from "react-redux";
import { toast } from "redux/actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toast = props => {
  const {
    toast: { message, intent, show, timeout },
    hideToast
  } = props;

  const handleClose = () => {
    hideToast({
      show: false,
      message: "",
      intent: intent
    });
  };

  console.log("timeout: ", timeout, show);

  return (
    <>
      {show && (
        <Snackbar
          open={show}
          autoHideDuration={timeout}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={intent}>{message}</Alert>
        </Snackbar>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  toast: state.toast
});

const mapDispatchToProps = {
  hideToast: toast.hideToast
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
