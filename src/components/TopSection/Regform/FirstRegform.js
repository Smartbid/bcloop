import React, { Component } from 'react'
import logo from '../../BottomSection/logo.png'
import {Redirect} from 'react-router-dom'
import {Reginputs, errorMessages} from 'sb-lp-framework'
import { resolvePreset } from '@babel/core'

class FirstRegform extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                first_name: '',
                email: ''
            },
            errors: {},
            redirect: false,
            responseError: ''
        }

        this.saveData = this.saveData.bind(this)
    }

    
    componentDidMount() {
        if (this.props.location.state) this.setState({form: Object.assign(this.state.form, this.props.location.state.form), responseError: this.props.location.state.responseError})
    }

    saveData() {
        let form = this.state.form
        let checkParams = this.props.validateParams(form)
        if (checkParams.success) this.setState({errors: {}}, () => {
            this.props.setLeadData(form).then(this.props.handleLeadStep).then(this.setState({redirect: true}))
        })
        else this.setState({errors: checkParams.errors})
    }

    render() {
        let languageManager = this.props.languageManager()
        let step = {   
            className: 'cardb',
            inputs: [
                {
                    name: 'first_name',
                    type: 'text',
                    className: 'inputfield',
                    errorClassName: 'inputError',
                    groupClassName: 'form_group'
                },
                {
                    name: 'email',
                    type: 'email',
                    className: 'inputfield',
                    errorClassName: 'inputError',
                    groupClassName: 'form_group'
                }
            ],
            button: {
                className: 'start',
                text: languageManager.button
            },
        }
       
        if (!this.state.redirect) {
            return (
                <div className="FirstRegform">
                    <img src={logo} alt="logo" className="logo"/>
                    <div className='inner'>
                        <div className='form-wrapper'>
                            <div className="errors">{this.state.responseError}</div>
                            
                            <Reginputs 
                                {...step}
                                trackStartEdit={this.props.trackStartEdit}
                                form={this.state.form}
                                languageManager={languageManager}
                                errors={this.state.errors}
                                onChange={form => this.setState({form})}/>
                                
                            <button onClick={this.saveData} className='start' >{languageManager.button}</button>

                        </div>
                    </div>
                </div>
            )

        } else { 
            return <Redirect to={{ pathname: '/members', 
                        search: this.props.location.search, 
                        state: this.state}}/> }

    }
}
export default FirstRegform;
