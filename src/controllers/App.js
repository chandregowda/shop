import React, { Component } from 'react';
// import styles from './App.css';
import Layout from '../components/Layout/Layout';
import withClass from '../hoc/withClass';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<BurgerBuilder />
				</Layout>
			</div>
		);
	}
}

export default withClass(App);
