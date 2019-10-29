import React from "react";
import ReactDOM from "react-dom";
import Root from "client/Root";
import * as firebase from "firebase";
import config from "firebaseConfig";

firebase.initializeApp(config);

ReactDOM.render(<Root />, document.getElementById("root"));
