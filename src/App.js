import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{ id: 'adf323', name: 'AAA', age: 20 },
			{ id: 'ajl120', name: 'BBB', age: 90 },
			{ id: 'kjhi32', name: 'CCC', age: 23 }
		],
		showPersonDetails: true
	};

	switchNameHandler = (e) => {
		console.log('Clicked... by ', e);
		this.setState({
			persons: [ { name: 'New', age: 45 } ]
		});
	};
	onTextChangeHandler = (e, id) => {
		console.log(e.target.value.trim());
		console.log(`ID to change: ${id}`);
		const personIndex = this.state.persons.findIndex((p) => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex]
		};

		person.name = e.target.value.trim();
		const persons = [ ...this.state.persons ];
		persons[personIndex] = person;

		this.setState({
			persons
		});
	};
	toggleView = () => {
		this.setState({
			showPersonDetails: !this.state.showPersonDetails
		});
	};
	deletePersonHandler = (personIndex) => {
		const persons = [ ...this.state.persons ];
		persons.splice(personIndex, 1);
		this.setState({ persons });
	};
	render() {
		return (
			<div>
				<button onClick={this.toggleView}>Toggle Person Details</button>
				{this.state.showPersonDetails &&
					this.state.persons.map((p, index) => {
						return (
							<Person
								key={p.id}
								deletePersonHandler={() => this.deletePersonHandler(index)}
								name={p.name}
								onClickHandler={this.switchNameHandler}
								onTextChangeHandler={(event) => this.onTextChangeHandler(event, p.id)}
							/>
						);
					})}
			</div>
		);
	}
}

export default App;
