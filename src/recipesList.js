'use-strict';

/*
  RecipesList shows 5 random recipes.
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import axios from 'axios';
import Recipe from './recipe';
import './recipes.css';

class RecipesList extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.setRecipes([]); // clear any previous recipes
    this.getRandomRecipes(this.props.numRecipes);
  }

  getRandomRecipes = numRecipes => {
    let recipePromises = [];
    // This would be cleaner if the API supported fetching 5 random recipes at once
    for (let i = 0; i < numRecipes; i++) {
      recipePromises.push(axios.get('https://www.themealdb.com/api/json/v1/1/random.php'));
    }

    Promise.all(recipePromises).then(responses => {
      for (let resp of responses) {
        if (resp.data.meals[0]) {
          this.props.addRecipe(resp.data.meals[0]);
        }
      }
    })
    .catch(err => console.log(err)); // ToDo: show error
  }

  render() {
    return (
      <div className="rootContainer">
        <div className="splashContainer">
          <div className="logoContainer">
            <img src="assets/logo.png" alt="logo"/>
          </div>
        </div>
        <div className="recipeOfDay">
          Recipes of the day
        </div>
        <div className="recipesContainer">
          { this.props.recipes.map(recipe => {
              return <Recipe recipe={recipe} key={recipe.idMeal}/>
            })
          }
        </div>
      </div>
    );
  }
}

RecipesList.defaultProps = {
  numRecipes: 5
};

const mapStateToProps = (state) => {
  return {
		recipes: state.recipes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRecipes: recipes => {
      dispatch(actions.setRecipes(recipes));
    },
    addRecipe: recipe => {
      dispatch(actions.addRecipe(recipe));
    },
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(RecipesList);
