import React, { Component } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import logo from '../../BottomSection/logo.png'
import hint from './6b.png'
import load from '../../../../public/load.png'
import { Redirect } from 'react-router-dom'

import {errorMessages, RegInputs} from 'sb-lp-framework'

export default class SecondRegform extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                first_name: '',
                last_name: '',
                password: '',
                email: '',
                phone_number: ''
            }
        }

        this.sendData = this.sendData.bind(this)
    }

    componentDidMount() {
        if (this.props.location) this.setState({form: Object.assign(this.state.form, this.props.location.state)})
    }

    sendData() {
        let form = this.state.form,
        checkParams = this.props.validateParams(form)
        
        if (checkParams.success) this.setState({loading: true, errors: {}}, () => {
            this.props.setLeadData(form).then(this.props.handleSubmit).then(res => (res.redirectUrl) ? window.location = res.redirectUrl : this.setState({path: '/'}))
        })
        else this.setState({errors: checkParams.errors, loading: false})
    }

    render() {
        let languageManager = this.props.languageManager()

        if (!this.state.path) { 
            return (
                <div className="SecondRegform">
                    <img src={logo} alt="logo" className="logo small"/>
                    {
                        (!this.state.loading) ?
                        <div className='inner'>
                            <div className='form-wrapper one'>
                                {errorMessages(this.state.errors).map(arr => arr.map(error => <div key={error} className="errors">{error}</div>))}

                                <div className="row">

                                    <RegInputs 
                                        form={this.state.form} 
                                        inputs={this.props.rowInputs}
                                        className={'inputfield small-input inline'}
                                        onChange={form => this.setState({form})}
                                        languageManager={languageManager}/>

                                </div>


                                {this.props.inputs.map(input => 
                                    <RegInputs 
                                        maxLength={(input === 'password') ? '8' : '32'}
                                        form={this.state.form} 
                                        inputs={[input]}
                                        className={'inputfield small-input'}
                                        onChange={form => this.setState({form})}
                                        languageManager={languageManager}/>
                                )}
                               
                                <img src={hint} alt="hint" className="hint"/>

                                <IntlTelInput
                                    fieldName="phone_number"
                                    preferredCountries={[this.props.countryCode]}
                                    containerClassName="intl-tel-input"
                                    inputClassName="inputfield tel small-input"
                                    defaultCountry={this.props.countryCode}
                                    autoPlaceholder={true}
                                    separateDialCode={true}
                                    value={this.state.form.phone_number}
                                    format={true}
                                    onPhoneNumberChange={(a, value, b) => {value = value.replace(/\D/g,''); this.setState({form: this.props.updateValue(this.state.form, value, 'phone_number')})}}
                                    />
                                <button onClick={this.sendData} className='start' >{languageManager.button_last}</button>
                            </div>
                    </div> : <img src={load} alt="loading" className="loading"/>
                    }
            </div>)

        } else { return <Redirect to={{ pathname: this.state.path, search: this.props.location.search, state: this.state.form}}/> }

    }
}
