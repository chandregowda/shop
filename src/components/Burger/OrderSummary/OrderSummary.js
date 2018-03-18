import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
		return (
			<li key={ingKey}>
				{ingKey.toUpperCase()} : {props.ingredients[ingKey]}
			</li>
		);
	});
	return (
		<Auxiliary>
			<h3 className={classes.OrderSummary}>Order Summary</h3>
			<p>A delicious burger with following ingredients</p>
			<ul> {ingredientSummary}</ul>
			<p>
				<strong>
					Total Price: <em>$ {props.totalPrice.toFixed(2)}</em>
				</strong>
			</p>
			<p>Continue to Checkout?</p>
			<Button clicked={props.canceled} btnType="Danger">
				CANCEL
			</Button>
			<Button clicked={props.continue} btnType="Success">
				CONTINUE
			</Button>
		</Auxiliary>
	);
};

export default OrderSummary;
