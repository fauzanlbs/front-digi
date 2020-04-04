import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Register from "./container/Register";
import Login from "./container/Login";
import Home from "./container/Home";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/Login", state: { from: props.location } }}
        />
      )
    }
  />
);

const App = () => {
  return (
    <Router>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/Register" component={Register} />
      <Route path="/Login" component={Login} />
    </Router>
  );
};

export default App;
