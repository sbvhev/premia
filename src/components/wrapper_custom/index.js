import React from "react";
import Toast from "components/toast";
import Progress from "components/progress";

const WrapperCustom = props => {
  return (
    <React.Fragment>
      <Progress />
      <Toast />
      {props.children}
    </React.Fragment>
  );
};

export default WrapperCustom;
