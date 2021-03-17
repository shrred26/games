import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Snake from "./snake";
import Flappy from './flappy'

export default () => (
        <Router>
            <Switch>
                <Route path='/snake'>
                    <Snake/>
                </Route>
                <Route path='/flappy'>
                    <Flappy/>
                </Route>
                <Route component={ Flappy } />
            </Switch>
        </Router>
)