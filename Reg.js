import React, { Component } from 'react'

import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import logo from '../Header/images/logo.png'
import {Redirect} from "react-router-dom";
import divWithClassName from "react-bootstrap/esm/utils/divWithClassName";

export default class Regform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                first_name: '',
                email: '',
                last_name: '',
                phone_number: ''
            },
            check: false,
            redirect: false
        };

        this.saveData = this.saveData.bind(this)
        this.sendData = this.sendData.bind(this)
        this.updateValue = this.updateValue.bind(this)
    }

    updateValue(value, key) {
        let obj = {},
            tempForm = this.state.form
        obj[key] = value
        Object.assign(tempForm, obj)
        console.log(value);
        this.setState({
            form: tempForm,
        })
    }

    componentDidMount() {
        if (this.props.location) this.setState({form: Object.assign(this.state.form, this.props.location.state)})
    }

    componentDidUpdate(prevState) {
        if (prevState.redirect) this.setState({redirect: false})
    }

    saveData() {
        let form = { first_name: this.state.form.first_name, email: this.state.form.email }
        let checkParams = this.props.validateParams(form)
        if (checkParams.success) this.setState({errors: {}}, () => {
            this.props.setLeadData(form).then(this.props.handleLeadStep).then(this.setState({redirect: true, path: '/secondpage'}))
        })
        else this.setState({errors: checkParams.errors})
    }

    sendData() {
        this.setState({load: true})
        let form = this.state.form,
            checkParams = this.props.validateParams(form)

        if (checkParams.success) this.setState({errors: {}}, () => {
            this.props.setLeadData(form).then(this.props.handleSubmit).then(res => {if (!res.success) this.setState({redirect: true, path: '/'})})
        })
        else this.setState({errors: checkParams.errors})
    }

    render() {
        let languageManager = this.props.languageManager(),
        path = this.props.location.pathname,
        errorMsgs = (this.state.errors) ? Object.keys(this.state.errors).map(key => { if (this.state.errors[key].messages) return this.state.errors[key].messages }).find(value => value) : []
        const errorMsgsValid = errorMsgs ? errorMsgs : [];

        if (!this.state.redirect) {
            return (
                <div className="Regform startFrom" ref={this.setTextInputRef} >
                    <div className='inner'>
                    {(path === '/') ? 
                      (
                        <div className='form-wrapper one'>
                            {errorMsgsValid.length > 0 && errorMsgsValid.map((error, index)=>{
                                return(<div style={{color: '#ff3215'}} key={index}>{error}</div>)
                            })}
                            {this.props.inputs.map((input)=> {
                                return (
                                    <input key={input} className={`inputfield ${input}`} type="text" name={input} placeholder={languageManager[input]} onChange={ (e) => this.updateValue(e.target.value, input) }/>
                                )
                            })}
                            <div className="btnBBox form-group">
                                <button onClick={this.saveData} className='btncustms btncustms1'>{languageManager.buttonSubmit}</button>
                                <span className="limittime">{languageManager.underSubmitBtn}</span>
                            </div>
                            <div className="form-group" style={{color: '#666666'}}>
                                <input type="checkbox" required="" checked={this.state.agree_1} name="agree1" onChange={() => this.setState({check: !this.state.check})}/>
                                {languageManager.agreeTerms}
                            </div>
                        </div>
                        ) :
                        (
                        (!this.state.load) ?
                        <div className={'form-wrapper two' + ((this.props.location.pathname === '/secondpage') ? ' step' : ' ')}>
                            {errorMsgsValid.length > 0 && errorMsgsValid.map((error, index)=>{
                                return(<div style={{color: '#ff3215'}} key={index}>{error}</div>)
                            })}
                            <div className="startFrom reg">
                                <div className="site_form">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <input type="text" defauleValue={this.state.form.first_name} className="form-control" name="first_name" id="first_name" placeholder="First Name" onChange={ (e) => this.updateValue(e.target.value, e.target.name)} />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" defauleValue={this.state.form.last_name}  className="form-control" id="last_name" name="last_name"  placeholder="Last Name"  onChange={ (e) => this.updateValue(e.target.value, e.target.name)} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="email" defauleValue={this.state.form.email}  className="form-control" name="email" id="email" placeholder="Email"/>
                                        </div>
                                    </div>
                                    <IntlTelInput
                                        preferredCountries={[this.props.countryCode]}
                                        containerClassName="intl-tel-input"
                                        inputClassName="inputfield tel"
                                        autoPlaceholder={true}
                                        separateDialCode={true}
                                        autoComplete="nope"
                                        onSelectFlag={this.handleSelectFlag}
                                        placeholder="Phone"
                                        value={this.state.form.phone_number}
                                        defaultCountry={this.props.countryCode}
                                        onPhoneNumberChange={(a, value, b) => {
                                            if(value.length<15) {
                                                this.setState({
                                                    phone_country_prefix: `+${countryData.dialCode}`,
                                                    dynamicNum: value.replace(/[^0-9]/g, '')
                                                })
                                                this.context.getCountryCode(countryData.iso2);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <button className="submit sign-up">{languageManager.mainbuttonSubmit}</button>
                        </div> : <img src={logo} alt="logo" className="loading"/>
                        )}
                    </div>
                </div>
            )
        } else { return <Redirect to={{ pathname: this.state.path, search: this.props.location.search, state: this.state.form}}/> }
    }
}