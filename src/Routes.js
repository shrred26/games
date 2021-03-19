import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Snake from "./snake";
import Flappy from './flappy'

const Routes = () => (
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

export default Routes;