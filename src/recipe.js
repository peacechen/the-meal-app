'use-strict';

/*
  Recipe shows 1 recipe in a modal.
*/

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './store/actions';
import './recipes.css';

class Recipe extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
    };
  }

  render() {
    const mealImgStyle = {
      backgroundImage: "url("+this.props.recipe.strMealThumb+")",
    }

    return (
      <div className="recipesContainer">
        <Link to={'/recipe/' + this.props.recipe.idMeal}>
          <div className="recipeTitle centerText">
            {this.props.recipe.strMeal}
          </div>
          <div style={mealImgStyle} className="recipeImageStyle"></div>
        </Link>
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
