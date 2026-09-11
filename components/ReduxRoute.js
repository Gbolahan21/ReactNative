import React from "react";
import { connect } from "react-redux";

import * as Actions from "../store/actions";

function ReduxRoute({ component: Component, ...props }) {
  return <Component {...props} />;
}

export default connect(
  (state) => state,
  Actions
)(ReduxRoute);