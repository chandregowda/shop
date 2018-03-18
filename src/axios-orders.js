import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burgerstore-2018.firebaseio.com/'
});

export default instance;
