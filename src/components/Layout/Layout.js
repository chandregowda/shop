import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Classes from './Layout.css';
const layout = (props) => (
	<Auxiliary>
		<div>Toolbar, SideDrawer, Backdrop</div>
		<main className={Classes.Content}>{props.children}</main>
	</Auxiliary>
);

export default layout;
