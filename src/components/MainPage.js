import React, { Component } from 'react'
import TopSection from './TopSection/TopSection'
import MidSection from './MidSection/MidSection'
import BottomSection from './BottomSection/BottomSection'

export default class MainPage extends Component {

    render() {

        return (
            <div className='MainPage'>
                <TopSection {...this.props} />

                <MidSection location={this.props.location} languageManager={this.props.languageManager}/>

                <BottomSection {...this.props} />
            </div>
        )
    }

}