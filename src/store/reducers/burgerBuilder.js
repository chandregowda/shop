import * as actionTypes from '../actions/actionTypes';
const DEFAULT_PRICE = 10;

const INITIAL_STATE = {
	ingredients: null,
	totalPrice: DEFAULT_PRICE,
	error: false
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
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.payload.ingredients.salad,
					bacon: action.payload.ingredients.bacon,
					cheese: action.payload.ingredients.cheese,
					meat: action.payload.ingredients.meat
				},
				totalPrice: DEFAULT_PRICE,
				error: false
			};
		case actionTypes.SET_ERROR_FETCH_INGREDIENTS:
			return {
				...state,
				error: true
			};
		default:
			return state;
	}
};
