import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildContrls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

import { connect } from 'react-redux';

class BurgerBuilder extends Component {
	state = {
		// ingredients: {
		// 	salad: 0,
		// 	bacon: 0,
		// 	cheese: 0,
		// 	meat: 0
		// },
		// totalPrice: 4,
		// purchasable: false,
		purchasing: false,
		loading: false
		// error: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
		// axios
		// 	.get('/ingredients.json')
		// 	.then((response) => {
		// 		console.log(response.data);
		// 		this.setState({ ingredients: response.data });
		// 	})
		// 	.catch((e) => {
		// 		console.log('Get Error', e);
		// 	});
	}
	updatePurchasing = () => {
		this.setState({ purchasing: true });
	};
	updatePurchasable = (ingredients = this.props.ings) => {
		const sum = Object.keys(ingredients)
			.map((ingKey) => {
				return ingredients[ingKey];
			})
			.reduce((price, el) => {
				return price + el;
			}, 0);
		// console.log('Total Sum: ', sum);
		return sum > 0;
	};

	purchsaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};
	purchsaseContinueHandler = () => {
		const queryParams = [];
		let ingredients = this.state.ingredients;
		for (let i in ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
		}
		let queryString = '?' + queryParams.join('&') + '&totalPrice=' + this.state.totalPrice;
		this.props.history.push({
			pathname: '/checkout',
			search: queryString
		});
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.props.error ? <p>Ingredients could not load</p> : <Spinner />;
		if (this.props.ings) {
			burger = (
				<Auxiliary>
					<Burger ingredients={this.props.ings} />
					<BuildContrls
						ingredientAdded={this.props.onIngredientAdd}
						ingredientRemoved={this.props.onIngredientRemove}
						disabledInfo={disabledInfo}
						totalPrice={this.props.price}
						purchasable={this.updatePurchasable()}
						ordered={this.updatePurchasing}
					/>
				</Auxiliary>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					canceled={this.purchsaseCancelHandler}
					continue={this.purchsaseContinueHandler}
					totalPrice={this.props.price}
				/>
			);
		}
		// if (this.state.loading) {
		// 	orderSummary = <Spinner />;
		// }
		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClicked={this.purchsaseCancelHandler}>
					{orderSummary}
				</Modal>

				{burger}
			</Auxiliary>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
		error: state.error
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdd: (ingredientName) => dispatch(burgerBuilderActions.addIngredients(ingredientName)),
		onIngredientRemove: (ingredientName) => dispatch(burgerBuilderActions.removeIngredients(ingredientName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
