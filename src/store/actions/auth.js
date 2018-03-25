import * as actionTypes from './actionTypes';
import axios from 'axios'; // URL is different, so use new one

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: { token: authData.idToken, userId: authData.localId }
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		payload: { error }
	};
};

export const auth = (email, password, isSignIn) => {
	console.log('EMAIL: ', email);
	console.log('Password: ', password);
	return (dispatch) => {
		dispatch(authStart());

		const authData = {
			email,
			password,
			returnSecureToken: true
		};

		let URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
		if (!isSignIn) {
			URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
		}
		const API_KEY = 'AIzaSyC808_oQUFgBM_SM9XKU-81ncTM5rvuxlE';
		const hostURL = URL + API_KEY;
		axios
			.post(hostURL, authData)
			.then((response) => {
				console.log('Successful Sign in/up');
				console.log(response.data);
				dispatch(authSuccess(response.data));
			})
			.catch((e) => {
				console.log('Authentication failed with error');
				console.log(e.response.data);
				dispatch(authFail(e.response.data.error));
			});
	};
};
