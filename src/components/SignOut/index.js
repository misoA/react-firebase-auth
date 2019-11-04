import React from "react";
import { withFirebase } from "components/Firebase";

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    로그아웃
  </button>
);

export default withFirebase(SignOutButton);
