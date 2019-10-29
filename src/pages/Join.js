import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Join extends Component {
  state = {
    isSignUp: false // Local signed-up state.
  };

  render() {
    return (
      <div>
        <h1>React Firebase Web App</h1>
        <h2>회원가입</h2>
        {this.isSignUp && <Redirect to="/login" />}
        <input id="name" placeholder="이름을 입력하세요" />
        <br />
        <input id="email" placeholder="email을 입력하세요" />
        <br />
        <input id="pwd" placeholder="비밀번호를 입력하세요" />
        <input id="pwdre" placeholder="비밀번호를 다시 입력하세요" />
        <br />
        <button>가입하기</button> <br />
        <button>
          <Link to="/">홈으로</Link>
        </button>
        <button>
          <Link to="/login">로그인</Link>
        </button>
      </div>
    );
  }
}

export default Join;
