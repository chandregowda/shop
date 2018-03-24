import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: 0
	};

	checkoutHandler = () => {
		console.log('checking out');
		this.props.history.replace('/checkout/contact-data');
	};
	cancelHandler = () => {
		console.log('cancelling');
		this.props.history.goBack();
	};
	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					checkoutHandler={this.checkoutHandler}
					cancelHandler={this.cancelHandler}
				/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};
export default connect(mapStateToProps)(Checkout);
