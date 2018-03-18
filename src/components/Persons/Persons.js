import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
	return props.persons.map((p, index) => {
		return (
			<Person
				key={p.id}
				deletePersonHandler={() => props.deletePersonHandler(index)}
				name={p.name}
				onTextChangeHandler={(event) => props.onTextChangeHandler(event, p.id)}
			/>
		);
	});
};

export default persons;
