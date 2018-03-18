import React, { Component } from 'react';
import styles from './Person.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';

class Person extends Component {
	render() {
		return (
			<Auxiliary>
				<h1>I'm a {this.props.name} </h1>
				<input type="text" onChange={this.props.onTextChangeHandler} value={this.props.name} />
				<button onClick={this.props.deletePersonHandler}>Delete me</button>
			</Auxiliary>
		);
	}
}

Person.propTypes = {
	name: PropTypes.string
};

export default withClass(Person, styles.Person);
