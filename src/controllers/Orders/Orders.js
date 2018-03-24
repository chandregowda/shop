import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
	state = {
		orders: []
	};
	componentDidMount() {
		this.setState({ loading: true });
		axios
			.get('/orders.json')
			.then((response) => {
				console.log(response.data);
				let fetchedOrders = [];
				for (let key in response.data) {
					fetchedOrders.push({ ...response.data[key], id: key });
				}
				this.setState({ orders: fetchedOrders, loading: false });
			})
			.catch((e) => {
				console.log('Failed to get orders from firebase', e);
				this.setState({ loading: false });
			});
	}
	render() {
		let orderList = null;
		if (this.state.loading) {
			orderList = <Spinner />;
		} else {
			orderList = this.state.orders.map((o) => {
				return <Order key={o.id} {...o} />;
			});
		}
		return <div className={classes.Orders}>{orderList}</div>;
	}
}

export default withErrorHandler(Orders, axios);
