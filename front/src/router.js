import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Profile from './pages/profile';
import Novo_incidente from './pages/novo_incidente';

export default function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidentes/novo" component={Novo_incidente} />
            </Switch>
        </BrowserRouter>
    )
}