import React from 'react';
import classes from './Order.css';

const order = (props) => {
	let ingredients = [];
	for (let ingName in props.ingredients) {
		ingredients.push({ name: ingName, amount: props.ingredients[ingName] });
	}
	let ingredientOutput = ingredients.map((ing) => {
		return (
			<span
				key={ing.name}
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 5px'
				}}
			>
				{ing.name} ({ing.amount})
			</span>
		);
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <strong>USD {+props.price.toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
