import React from "react";

import { AuthUserContext, withAuthorization } from "components/Session";
import { PasswordForgetForm } from "components/PasswordForget";
import PasswordChangeForm from "components/PasswordChange";

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Welcome My Home</h1>
        <hr />
        <h2>내 비밀번호 변경</h2>
        <h5>변경 메일 보내기 (email : {authUser.email})</h5>
        <PasswordForgetForm />
        <h5>바로 변경하기</h5>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
