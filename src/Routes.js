import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Snake from "./snake";
import Flappy from './flappy'
import PingPong from "./pingpong";

const Routes = () => (
        <Router>
            <Switch>
                <Route path='/snake'>
                    <Snake/>
                </Route>
                <Route path='/flappy'>
                    <Flappy/>
                </Route>
                <Route path='/ping-pong'>
                    <PingPong/>
                </Route>
                <Route component={ Flappy } />
            </Switch>
        </Router>
)

export default Routes;