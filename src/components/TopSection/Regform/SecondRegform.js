import React, { Component } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import logo from '../../BottomSection/logo.png'
import hint from './6b.png'
import {UserContext} from '../../../helpers/dataContext';


export default class SecondRegform extends Component {
    static contextType = UserContext;
    state = {
        first_name: "",
        last_name: "",
        email: "",
        check: false,
        password: "",
        phone_country_prefix: "",
        phone_number: "",
        agree_1: true,
        agree_2: true,
        errorIndexes: [0,1,2,3]
    };

    phoneNumberBlur = (status, value, countryData) => {
        this.setState({
            phone_country_prefix: `+${countryData.dialCode}`
        });
    }

    phoneValidate = (value) => {
        return !/[^0-9\-\/]/.test(value);
    };

    nameValidate = (value) => {
        return !/^([^0-9]*)$/.test(value);
    };

    emailValidate = (value) => {
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    handleForward = () => {
        if (this.state.phone_number.length > 5) {
            let paramsToValidate = {
                email: this.context.email,
                first_name: this.context.firstName,
                last_name: this.context.lastName,
                password: this.context.password,
                agree_2: this.state.agree_2,
                phone_number: this.state.phone_number,
                phone_country_prefix: this.state.phone_country_prefix
            };
            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleSubmit(paramsToValidate);
            }
            else{
                this.setState({
                    errors: submitResponse.errors
                })
            }
        }
    };


    handleStepChange = (name, value) => {
        if (name === 'first_name') {

            let firstNameValue = value;
            if (this.nameValidate(firstNameValue)) {
                this.setState({
                    errors: ['Please enter name without digits']
                });
                return this.state.errors

            } else {
                this.setState({first_name: firstNameValue});
            }

        } else if (name === 'lastName') {

            let SecondNameValue = value;
            if (this.nameValidate(SecondNameValue)) {

                this.setState({
                    errors: ['Please enter name without digits']
                });
                return this.state.errors

            } else {
                this.setState({last_name: SecondNameValue});
            }

        } else if (name === 'password') {

            let passwordValue = value;
            this.setState({password: passwordValue});

        } else if (name === 'email') {

            let emailValue = value;
            if(this.emailValidate(emailValue)) {
                this.setState({
                    errors: ['Invalid email format']
                });
                return this.state.errors

            } else {
                this.setState({email: emailValue});
            }
        }
    };


    render() {

        let languageManager = this.props.languageManager();
        return (
            <div className="SecondRegform">
                <img src={logo} alt="logo" className="logo small"/>
                <div className='inner'>
                    <div className='form-wrapper one'>
                         {/*{this.state.errors && <div className="errors">
                                {this.state.errors[0]}
                                    </div>}*/}
                        <div className="row">
                            <div className="col-lg-6">
                                <input className="inputfield fname small-input" type="text" name="first_name" value={this.context.firstName} placeholder={languageManager.fname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            </div>
                            <div className="col-lg-6">
                                <input className="inputfield lname small-input" type="text" name="lastName" placeholder={languageManager.lname} defaultValue={this.context.lastName} onChange={(e) => {this.handleStepChange(e.target.name, e.target.value); this.context.getValueFromInputs(e)}}/>
                            </div>
                        </div>
                        <input className="inputfield email small-input" type="text" name="email" placeholder={languageManager.email} value={this.context.email} autoComplete='off' onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                        <input className="inputfield pass small-input" type="password" maxLength="8" defaultValue={this.context.password} onChange={(e) => {this.handleStepChange(e.target.name, e.target.value); this.context.getValueFromInputs(e)}} name="password" placeholder={languageManager.pass}/>
                        <img src={hint} alt="hint" className="hint"/>
                        <IntlTelInput
                            fieldName="phoneNumber"
                            preferredCountries={[this.props.countryCode]}
                            containerClassName="intl-tel-input"
                            inputClassName="inputfield tel small-input"
                            defaultCountry={this.context.countryCode}
                            autoPlaceholder={true}
                            separateDialCode={true}
                            onPhoneNumberBlur={this.phoneNumberBlur}
                            onPhoneNumberChange={(status, value, countryData, number, id) => {
                                if (value.length < 15) {
                                    this.setState({
                                        phone_number: value.replace(/[^0-9]/g, ''),
                                    });
                                    this.context.savedPhoneNumber(value);
                                    this.context.defaultCountry(countryData.iso2);
                                }
                            }}
                            value={this.context.phoneNumber}
                        />
                        <button onClick={this.handleForward} className='start' >{languageManager.button_last}</button>
                    </div>
                </div>
            </div>
        )
    }
}
