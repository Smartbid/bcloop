import React, { Component } from 'react'
import logo from '../../BottomSection/logo.png'
import {Redirect} from 'react-router-dom'

class FirstRegform extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                first_name: '',
                email: ''
            },
            redirect: false,
        }

        this.saveData = this.saveData.bind(this)
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
        let languageManager = this.props.languageManager(),
        errorMsgs = (this.state.errors) ? Object.keys(this.state.errors).map(key => { if (this.state.errors[key].messages) return this.state.errors[key].messages }).filter(value => value) : []

        if (!this.state.redirect) {
            return (
                <div className="FirstRegform">
                    <img src={logo} alt="logo" className="logo"/>
                    <div className='inner'>
                        <div className='form-wrapper'>
                            {errorMsgs.map(arr => arr.map(error => <div key={error} className="errors">{error}</div>))}
                            {this.props.inputs.map(input => <input className={"inputfield " + input} key={input} type="text" name={input} onChange={(e) => this.setState({form: this.props.updateValue(this.state.form, e.target.value, input)})} placeholder={languageManager[input]} />)}
                            <button onClick={this.saveData} className='start'>{languageManager.button}</button>
                        </div>
                    </div>
                </div>
            )

        } else { 
            return <Redirect to={{ pathname: '/members', 
                        search: this.props.location.search, 
                        state: this.state.form}}/> }

    }
}
export default FirstRegform;
