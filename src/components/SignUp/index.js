import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "components/Firebase";
import * as ROUTES from "constants/routes";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpFrom />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  phone: "",
  passwordOne: "",
  passwordTwo: "",
  role: "User",
  error: null
};

class SignUpFromBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, phone, role, passwordOne } = this.state;

    this.props.firebase
      //create user in firebase auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      // create user in firebase realtime DB
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email, phone, role });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      phone,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      phone === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="이름"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="이메일"
        />
        <input
          name="phone"
          value={phone}
          onChange={this.onChange}
          type="tel"
          pattern="[0-9]{9,12}"
          placeholder="핸드폰 번호 ('-' 제외)"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="비밀번호"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="비밀번호 확인"
        />
        <button disabled={isInvalid} type="submit">
          가입하기
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    멤버가 되고 싶나요? <Link to={ROUTES.SIGN_UP}>가입하기</Link>
  </p>
);

const SignUpFrom = compose(
  withRouter,
  withFirebase
)(SignUpFromBase);

export default SignUpPage;

export { SignUpFrom, SignUpLink };
