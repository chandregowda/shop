import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		displaySideDrawer: false
	};
	closeSideDrawer = () => {
		this.setState({ displaySideDrawer: false });
	};
	toggleSideDrawer = () => {
		this.setState((prevState) => {
			return { displaySideDrawer: !prevState.displaySideDrawer };
		});
	};
	render() {
		return (
			<Auxiliary>
				<Toolbar displaySideDrawer={this.state.displaySideDrawer} toggleSideDrawer={this.toggleSideDrawer} />
				<SideDrawer displaySideDrawer={this.state.displaySideDrawer} closeSideDrawer={this.closeSideDrawer} />
				<main className={Classes.Content}>{this.props.children}</main>
			</Auxiliary>
		);
	}
}

export default Layout;
