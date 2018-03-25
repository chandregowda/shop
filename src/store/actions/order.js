import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderID, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		payload: { id: orderID, orderData }
	};
};
export const pruchaseBurgerFail = (e) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		payload: { error: e }
	};
};
export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};
export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json?auth=' + token, orderData)
			.then((response) => {
				console.log(response.data);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
				// this.props.history.push('/');
			})
			.catch((e) => {
				dispatch(pruchaseBurgerFail(e));
				// this.setState({ loading: false });
				// console.log('Error:', e);
			});
	};
};

export const fetchOrderSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDER_SUCCESS,
		payload: { orders }
	};
};

export const fetchOrderFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDER_FAIL,
		payload: error
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDER_START
	};
};

export const fetchOrders = (token) => {
	return (dispatch) => {
		dispatch(fetchOrderStart());
		axios
			.get('/orders.json?auth=' + token)
			.then((response) => {
				console.log(response.data);
				let fetchedOrders = [];
				for (let key in response.data) {
					fetchedOrders.push({ ...response.data[key], id: key });
				}
				dispatch(fetchOrderSuccess(fetchedOrders));
			})
			.catch((e) => {
				console.log('Failed to get orders from firebase', e);
				dispatch(fetchOrderFail(e));
			});
	};
};
