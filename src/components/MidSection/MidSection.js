import React, { Component } from 'react'
import Faq from './Faq/Faq'
import Review from './Review/Review'
import Discover from './Discover/Discover'
import EarnBlock from './EarnBlock/EarnBlock'
import MoreNews from './MoreNews/MoreNews'
import Advantage from './Advantage/Advantage'

export default class SecondMidSection extends Component {
    render() {
        let languageManager=this.props.languageManager,
        path = this.props.location.pathname

        if (path === '/') return (
            <div className="MidSection">
                <Advantage languageManager={languageManager}/>
                <Discover languageManager={languageManager}/>
                <EarnBlock languageManager={languageManager}/>
                <MoreNews languageManager={languageManager}/>
                <Review languageManager={languageManager}/>
            </div>
        )
        else return (
            <div className="MidSection">
                <Review languageManager={this.props.languageManager}/>
                <Faq languageManager={this.props.languageManager}/>
                <Discover languageManager={this.props.languageManager}/>
            </div>
        )
    }
}
