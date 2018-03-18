import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildContrls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
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
		purchasing: false,
		loading: false
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
		// alert('Continue');
		this.setState({ loading: true });
		const data = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'AAA',
				email: 'aaa@b.com',
				address: {
					street: 'Hampinagar',
					zipcode: '560040',
					country: 'India'
				}
			}
		};
		axios
			.post('/orders.json', data)
			.then((response) => {
				this.setState({ loading: false, purchasing: false });
				console.log(response);
			})
			.catch((e) => {
				this.setState({ loading: false, purchasing: false });
				console.log('Error:', e);
			});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = (
			<OrderSummary
				ingredients={this.state.ingredients}
				canceled={this.purchsaseCancelHandler}
				continue={this.purchsaseContinueHandler}
				totalPrice={this.state.totalPrice}
			/>
		);
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClicked={this.purchsaseCancelHandler}>
					{orderSummary}
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

export default withErrorHandler(BurgerBuilder, axios);
