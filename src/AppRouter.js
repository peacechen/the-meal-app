import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RecipesList from './recipesList';
import RecipeDetails from './recipeDetails';

const AppRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={RecipesList} />
      <Route path="/recipe/:id" component={RecipeDetails}/>
    </div>
  </Router>
);

export default AppRouter;
