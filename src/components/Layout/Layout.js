import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
	<Auxiliary>
		<Toolbar />
		<main className={Classes.Content}>{props.children}</main>
	</Auxiliary>
);

export default layout;
