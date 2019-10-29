import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home, Join, Login } from "pages";
import * as firebase from "firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      speed: 10,
      email: "alth@gmail.com",
      password: "testtest",
      login: "no"
    };
  }

  componentDidMount() {
    const rootRef = firebase
      .database()
      .ref()
      .child("react");
    const speedRef = rootRef.child("speed");
    speedRef.on("value", snap => {
      this.setState({
        speed: snap.val()
      });
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    this.setState({
      login: "yes"
    });
  }

  render() {
    let homePath = null;
    if (this.state.login === "yes") {
      homePath = <Route exact path="/" component={Home} />;
    } else {
      homePath = <Route path="/login" component={Login} />;
    }
    return (
      <div className="App">
        <h1>{this.state.speed}</h1>
        <h1>{this.state.login}</h1>
        {homePath}
        <Route path="/join" component={Join} />
      </div>
    );
  }
}

export default App;
