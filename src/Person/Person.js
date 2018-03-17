import React from 'react';
import './Person.css';

const person = (props) => {
  return (
    <div className="Person">
    <h1>I'm a {props.name} </h1>
    <input type="text" onChange={props.onTextChangeHandler} value={props.name} />
    <button onClick={props.deletePersonHandler}>Delete me</button>
    </div>
  )
}

export default person;