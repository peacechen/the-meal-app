'use-strict';

/*
  Recipe Details
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './recipes.css';
import iconStyles from './iconStyles';

const history = createBrowserHistory();

class Recipe extends Component {
  constructor(props, context) {
    super(props);

    let idMeal = props.match.params.id;
    let recipe;
    // Search for recipe in Redux state.
    for (let r of this.props.recipes) {
      if (idMeal === r.idMeal) {
        recipe = r;
        break;
      }
    }

    this.state = {
      mealImgStyle: {},
      recipe: {},
      ingredients: [],
      ...this.updateRecipeState(recipe),
    };
  }

  componentDidMount() {
    if (this.state.ingredients.length === 0 && Object.entries(this.state.recipe).length === 0) {
      // Fetch recipe from server.  This can happen if the route was opened directly.
      axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.props.match.params.id)
      .then(response => {
        this.setState({...this.updateRecipeState(response.data.meals[0])});
      })
      .catch(err => console.log(err)); // ToDo: show error
    }
  }

  updateRecipeState = recipe => {
    if(!recipe) {
      return {};
    }
    let mealImgStyle = {
      backgroundImage: "url("+recipe.strMealThumb+")",
    };

    // Gather ingredients from weird data model
    let ingredients = [];
    for (let entry of Object.entries(recipe)) {
      if (entry[0].includes("strIngredient")) {
        ingredients.push(entry[1]);
      }
    }

    return {mealImgStyle, recipe, ingredients};
  };

  render() {
    return (
      <div className="recipesContainer" style={{height: '100%'}}>
        <div className="navHeader">
          <IconButton
            style={iconStyles.medium}
            aria-label="Back"
            onClick={history.goBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="sm" className="backIcon"/>
          </IconButton>
        </div>
        <div style={this.state.mealImgStyle} className="recipeImageStyle"></div>

        <div className="recipeContents">
          <div className="recipeDetailsTitle">
            {this.state.recipe.strMeal}
          </div>
          { this.state.ingredients.map((ingr, i) =>
            <div className="ingredient" key={i}>
              {ingr}
            </div>
          )}
          <div className="recipeDetailsTitle"/>
          <div className="recipeDetailsTitle">
            Directions
          </div>
          <div className="">
            {this.state.recipe.strInstructions}
          </div>
        </div>
      </div>
    );
  }
}

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

export default connect( mapStateToProps, mapDispatchToProps )(Recipe);
