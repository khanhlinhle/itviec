import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";

import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Page404 from "./pages/404";

function App() {
  let [user, setUser] = useState({ isAuthenticated: false });

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Jobs} />
        <Route path="/jobs" exact component={Jobs} />
        <Route path="/login" exact component={Login} />
        <ProtectedRoute
          path="/jobs/:id"
          render={(props) => <Detail {...props} />}
        />
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
