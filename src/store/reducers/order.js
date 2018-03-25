import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

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
			return updateObject(state, { loading: true });
		}
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return updateObject(state, {
				loading: false,
				orders: state.orders.concat({ id: action.payload.id, ...action.payload.orderData })
			});

		case actionTypes.PURCHASE_BURGER_FAIL:
			return updateObject(state, { loading: false });

		case actionTypes.FETCH_ORDER_START: {
			return updateObject(state, { loading: true });
		}
		case actionTypes.FETCH_ORDER_SUCCESS: {
			return updateObject(state, {
				loading: false,
				orders: action.payload.orders
			});
		}
		case actionTypes.FETCH_ORDER_FAIL: {
			return updateObject(state, {
				loading: false
			});
		}
		default:
			return state;
	}
};
