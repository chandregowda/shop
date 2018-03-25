import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrder();
	}
	render() {
		let orderList = null;
		if (this.props.loading) {
			orderList = <Spinner />;
		} else {
			orderList = this.props.orders.map((o) => {
				return <Order key={o.id} {...o} />;
			});
		}
		return <div className={classes.Orders}>{orderList}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.order.loading,
		orders: state.order.orders
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrder: () => dispatch(actions.fetchOrders())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
