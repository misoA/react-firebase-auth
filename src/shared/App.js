import React from "react";
import { Route } from "react-router-dom";
import { Home, Join, Login } from "pages";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/Login" component={Login} />
      <Route path="/join" component={Join} />
    </div>
  );
}

export default App;
