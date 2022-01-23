import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";

export default function Rotas() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/repositorio/:repositorio" component={Repositorio} />
        </Switch>
    </BrowserRouter>
  );
}
