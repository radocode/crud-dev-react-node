/**
 *
 * Register
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectRegister from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

export function Register() {
  useInjectReducer({ key: "register", reducer });
  useInjectSaga({ key: "register", saga });

  return (
    <div>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Description of Register" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(Register);
