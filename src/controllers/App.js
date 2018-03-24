import React, { Component } from 'react';
// import styles from './App.css';
import Layout from '../components/Layout/Layout';
import withClass from '../hoc/withClass';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';

import { Route, Switch } from 'react-router-dom';
class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/orders" component={Orders} />
						<Route path="/" exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default withClass(App);
