import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			Current Price :<em>${props.totalPrice.toFixed(2)}</em>
		</p>
		{controls.map((c) => (
			<BuildControl
				key={c.label}
				label={c.label}
				added={() => props.ingredientAdded(c.type)}
				removed={() => props.ingredientRemoved(c.type)}
				disabled={props.disabledInfo[c.type]}
			/>
		))}
		<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
			ORDER NOW
		</button>
	</div>
);

export default buildControls;
