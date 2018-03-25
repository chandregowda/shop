import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENTS,
		payload: { ingredientName: name }
	};
};

export const removeIngredients = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENTS,
		payload: { ingredientName: name }
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		payload: { ingredients }
	};
};
export const setErrorFetchIngredients = () => {
	return {
		type: actionTypes.SET_ERROR_FETCH_INGREDIENTS
	};
};

export const initIngredients = (dispatch) => {
	return (dispatch) => {
		axios
			.get('/ingredients.json')
			.then((response) => {
				console.log(response.data);
				dispatch(setIngredients(response.data));
			})
			.catch((e) => {
				console.log('Get Error', e);
				dispatch(setErrorFetchIngredients());
			});
	};
};
