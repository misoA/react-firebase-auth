import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";

class Login extends Component {
  state = {
    isSignedIn: false // Local signed-in state.
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  render() {
    return (
      <div>
        <h1>React Firebase Web App</h1>
        {this.isLogin && <Redirect to="/" />}
        <p>로그인 해주세요</p>
        <input id="email" placeholder="email을 입력하세요" />
        <br />
        <input id="pwd" placeholder="비밀번호를 입력하세요" />
        <br />
        <button>로그인</button> <br />
        <button>
          <Link to="/">홈으로</Link>
        </button>
        <button>
          <Link to="/join">회원가입</Link>
        </button>
      </div>
    );
  }
}

export default Login;
