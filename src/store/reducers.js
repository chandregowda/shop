import * as actionTypes from './actions';

const INITIAL_STATE = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 4
};

const INGREDIENT_PRICE_LIST = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 0.2,
	meat: 1.3
};
/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE_LIST[action.payload.ingredientName]
			};

		case actionTypes.REMOVE_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE_LIST[action.payload.ingredientName]
			};

		default:
			return state;
	}
};
