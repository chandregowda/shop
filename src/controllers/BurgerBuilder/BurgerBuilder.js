import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildContrls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICE_LIST = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 0.2,
	meat: 1.3
};
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	};

	updatePurchasing = () => {
		this.setState({ purchasing: true });
	};
	updatePurchasable = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((ingKey) => {
				return ingredients[ingKey];
			})
			.reduce((price, el) => {
				return price + el;
			}, 0);
		// console.log('Total Sum: ', sum);
		this.setState({
			purchasable: sum > 0
		});
	};
	addIngredient = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICE_LIST[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
		this.updatePurchasable(updatedIngredient);
	};

	removeIngredient = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICE_LIST[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
		this.updatePurchasable(updatedIngredient);
	};

	purchsaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};
	purchsaseContinueHandler = () => {
		alert('Continue');
	};
	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClicked={this.purchsaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						canceled={this.purchsaseCancelHandler}
						continue={this.purchsaseContinueHandler}
						totalPrice={this.state.totalPrice}
					/>
				</Modal>

				<Burger ingredients={this.state.ingredients} />
				<BuildContrls
					ingredientAdded={this.addIngredient}
					ingredientRemoved={this.removeIngredient}
					disabledInfo={disabledInfo}
					totalPrice={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.updatePurchasing}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
