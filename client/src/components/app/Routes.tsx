import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { IsAuth } from "../../hooks/user/isAuth";
import Authors from "../../pages/Authors";
import Books from "../../pages/Books";
import Categories from "../../pages/Categories";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Header from "../Header/Header";

function Routes() {
  const me = IsAuth();

  return (
    <BrowserRouter>
      <div>
        <Header user={me} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/books" component={me ? Categories : Books} />
          <Route exact path="/authors" component={me ? Categories : Authors} />
          <Route exact path="/categories" component={me ? Categories : Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Routes;
