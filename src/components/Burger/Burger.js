import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';
import { withRouter } from 'react-router-dom';

// }
const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients).map((ingKey) => {
		return [ ...Array(props.ingredients[ingKey]) ].map((_, index) => (
			<BurgerIngredient key={ingKey + index} type={ingKey} />
		));
	});

	transformedIngredients = transformedIngredients.reduce((arr, el) => {
		return arr.concat(el);
	}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please add some ingredients</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default withRouter(burger);
