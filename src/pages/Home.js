import React, { Component } from "react";
import { Link } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

class Home extends Component {
  state = {
    isSignedIn: false // Local signed-in state.
  };

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>React Firebase Web App</h1>
          <hr />
          <h2>firebase UI 로그인</h2>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <hr />
          <h2>커스텀 로그인</h2>
          <button>
            <Link to="/login"> 로그인</Link>
          </button>
          <button>
            <Link to="/join">회원가입</Link>
          </button>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in!
        </p>
        <button onClick={() => firebase.auth().signOut()}>로그아웃</button>
      </div>
    );
  }
}

export default Home;
