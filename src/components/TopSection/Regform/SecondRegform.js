import React, { Component } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import logo from '../../BottomSection/logo.png'
import hint from './6b.png'
import load from '../../../../public/load.png'
import { Redirect } from 'react-router-dom'

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
            },
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
            this.props.setLeadData(form).then(this.props.handleSubmit).then(res => {if (!res.success) this.setState({redirect: true})})
        })
        else this.setState({errors: checkParams.errors, loading: false})
    }

    render() {
        let languageManager = this.props.languageManager(),
        errorMsgs = (this.state.errors) ? Object.keys(this.state.errors).map(key => { if (this.state.errors[key].messages) return this.state.errors[key].messages }).filter(value => value) : []

        if (!this.state.redirect) { 
            return (
                <div className="SecondRegform">
                    <img src={logo} alt="logo" className="logo small"/>
                    {
                        (!this.state.loading) ?
                        <div className='inner'>
                            <div className='form-wrapper one'>
                                {errorMsgs.map(arr => arr.map(error => <div key={error} className="errors">{error}</div>))}

                                <div className="row">

                                    {this.props.rowInputs.map(input => 
                                        <div key={input} className="col-lg-6">
                                            <input className={"inputfield small-input " + input} 
                                            type="text" name={input} 
                                            defaultValue={this.state.form[input]} 
                                            onChange={(e) => this.setState({form: this.props.updateValue(this.state.form, e.target.value, input)})} 
                                            placeholder={languageManager[input]} />
                                        </div>)}

                                </div>

                                {this.props.inputs.map(input => 
                                    <input className={"inputfield small-input " + input}
                                        maxLength={(input !== 'password') ? '32' : '8'}
                                        key={input} 
                                        type={input} 
                                        name={input} 
                                        defaultValue={this.state.form[input]} 
                                        onChange={(e) => this.setState({form: this.props.updateValue(this.state.form, e.target.value, input)})} 
                                        placeholder={languageManager[input]} />)}
                               
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

        } else { return <Redirect to={{ pathname: '/', search: this.props.location.search, state: this.state.form}}/> }

    }
}
