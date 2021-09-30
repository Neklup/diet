import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ChooseFoodContainer from '../containers/ChooseFoodContainer'
import AddFoodContainer from '../containers/AddFoodContainer'
import DatabaseContainer from '../containers/DatabaseContainer'
import HomePageContainer from '../containers/HomePageContainer'
import SuggestContainer from '../containers/SuggestContainer'

export default function App() {
  return (

        <Switch>
          <Route path="/food">
            <ChooseFoodContainer />
          </Route>
          <Route path="/add">
            <AddFoodContainer/>
          </Route>
          <Route path="/database">
            <DatabaseContainer/>
          </Route>
          <Route path="/suggest/:id/:calories">
            <SuggestContainer/>
          </Route>
            <Route path="">
            <HomePageContainer/>
          </Route>

        </Switch>

  );
}