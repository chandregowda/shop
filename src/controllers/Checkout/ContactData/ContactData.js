import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
	state = {
		formIsValid: true,
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				isValid: false,
				touched: false,
				validation: {
					required: true,
					minimumLength: 3,
					maximumLength: 25
				}
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: '@'
				},
				value: '',
				isValid: false,
				touched: false,
				validation: {
					minimumLength: 6,
					required: true
				}
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				isValid: true,
				touched: false,
				validation: {
					required: true
				}
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZipCode'
				},
				value: '',
				isValid: true,
				touched: false,
				validation: {
					required: true
				}
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				isValid: true,
				touched: false,
				validation: {
					required: true
				}
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{
							value: 'fastest',
							displayValue: 'Fastest'
						},
						{
							value: 'cheapest',
							displayValue: 'Cheapest'
						}
					]
				},
				value: 'fastest',
				isValid: true,
				validation: {}
			}
		}
	};

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		// this.setState({ loading: true });
		const data = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};
		this.props.onOrderBurger(data);
		// axios
		// 	.post('/orders.json', data)
		// 	.then((response) => {
		// 		this.setState({ loading: false });
		// 		console.log(response);
		// 		this.props.history.push('/');
		// 	})
		// 	.catch((e) => {
		// 		this.setState({ loading: false });
		// 		console.log('Error:', e);
		// 	});
	};

	validateFormFields = (value, rules) => {
		let isValid = true;
		if (!rules) {
			return isValid;
		}
		value = value.trim();
		if (rules.required) {
			isValid = value !== '';
		}
		if (isValid && rules.minimumLength) {
			isValid = value.length >= rules.minimumLength;
		}
		if (isValid && rules.maximumLength) {
			isValid = value.length <= rules.maximumLength;
		}
		console.log(`isValid : ${isValid}`);
		return isValid;
	};

	inputChangeHandler = (event, identifier) => {
		const updatedFormData = { ...this.state.orderForm };
		const updatedFormElement = { ...updatedFormData[identifier] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.isValid = this.validateFormFields(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedFormData[identifier] = updatedFormElement;
		// console.log(updatedFormElement);
		let formIsValid = true;
		for (let inputIdentifer in updatedFormData) {
			formIsValid = updatedFormData[inputIdentifer].isValid && formIsValid;
		}
		this.setState({ orderForm: updatedFormData, formIsValid: formIsValid });
	};

	render() {
		let formElements = [];
		for (let key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form className={classes.Form} onSubmit={this.orderHandler}>
				{formElements.map((elem) => {
					return (
						<Input
							key={elem.id}
							isValid={elem.config.isValid}
							shouldValidate={elem.config.validation}
							hasTouched={elem.config.touched}
							changed={(event) => this.inputChangeHandler(event, elem.id)}
							elementType={elem.config.elementType}
							elementConfig={elem.config.elementConfig}
							value={elem.config.value}
						/>
					);
				})}

				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h3>Enter your Contact details</h3>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));
