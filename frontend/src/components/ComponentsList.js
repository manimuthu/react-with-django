import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import TodoList from './list';
import TodoForm from './form';

// This example show how you could create a custom
// <Link> that renders something special when the URL
// is the same as the one the <Link> points to.

export default function CreateRoutes() {
  
  return (
    
    <Router>
      <div id="wrapper">     
        <Switch>

        <Route path="/todos/create" exact component = {TodoForm}  />
        <Route path="/todos/:id" exact component = {TodoForm}  />
        <Route path="/todos" exact component = {TodoList}  />

		</Switch>
      </div>
        
    </Router>
  );
}
