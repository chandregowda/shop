import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
	orders: [],
	loading: false
};

/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START: {
			return {
				...state,
				loading: true
			};
		}
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return {
				...state,
				loading: false,
				orders: state.orders.concat({ id: action.payload.id, orderData: action.payload.orderData })
			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
};
