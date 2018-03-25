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
export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json', orderData)
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
